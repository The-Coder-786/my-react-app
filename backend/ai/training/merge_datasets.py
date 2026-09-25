from pathlib import Path
import shutil
import uuid


HELMET_DATASET = Path(
    r"C:\AI\Motorcycle Helmet.v1i.yolov11"
)

VEHICLE_DATASET = Path(
    r"C:\AI\m1.v1i.yolov11"
)

MOTORCYCLE_DATASET = Path(
    r"C:\AI\Motorcycle-train.v1i.yolov11"
)

FINAL_DATASET = Path(
    r"C:\Users\shami\Documents\my-react-app\backend\ai\final_dataset"
)


FINAL_CLASSES = {
    "person": 0,
    "car": 1,
    "motorcycle": 2,
    "bicycle": 3,
    "helmet": 4,
    "no_helmet": 5,
}


# Helmet dataset:
# 0 Helmet
# 1 No-Helmet
# 2 person
HELMET_MAPPING = {
    0: 4,
    1: 5,
    2: 0,
}


# Vehicle dataset:
# 0 bicycle
# 1 car
# 2 person
VEHICLE_MAPPING = {
    0: 3,
    1: 1,
    2: 0,
}


# Motorcycle dataset:
# 0 Motorcycle
MOTORCYCLE_MAPPING = {
    0: 2,
}


IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp",
}


def create_structure():
    if FINAL_DATASET.exists():
        print("Removing old final_dataset...")
        shutil.rmtree(FINAL_DATASET)

    for split in ["train", "valid", "test"]:
        (
            FINAL_DATASET
            / split
            / "images"
        ).mkdir(
            parents=True,
            exist_ok=True
        )

        (
            FINAL_DATASET
            / split
            / "labels"
        ).mkdir(
            parents=True,
            exist_ok=True
        )


def convert_annotation(parts, new_class_id):
    """
    Converts an annotation to YOLO detection format:

    class_id x_center y_center width height

    Supports:
    1. Existing YOLO bounding boxes
    2. YOLO segmentation polygons
    """

    # -----------------------------------------
    # Standard YOLO detection bounding box
    # -----------------------------------------
    if len(parts) == 5:
        try:
            x_center = float(parts[1])
            y_center = float(parts[2])
            width = float(parts[3])
            height = float(parts[4])
        except ValueError:
            return None

        return (
            f"{new_class_id} "
            f"{x_center:.6f} "
            f"{y_center:.6f} "
            f"{width:.6f} "
            f"{height:.6f}"
        )

    # -----------------------------------------
    # YOLO segmentation polygon
    #
    # Format:
    # class x1 y1 x2 y2 x3 y3 ...
    #
    # Convert polygon into bounding box.
    # -----------------------------------------
    if len(parts) > 5:
        try:
            coordinates = [
                float(value)
                for value in parts[1:]
            ]
        except ValueError:
            return None

        # Coordinates must be x,y pairs.
        if len(coordinates) % 2 != 0:
            return None

        if len(coordinates) < 6:
            return None

        xs = coordinates[0::2]
        ys = coordinates[1::2]

        x_min = min(xs)
        x_max = max(xs)

        y_min = min(ys)
        y_max = max(ys)

        x_center = (
            x_min + x_max
        ) / 2

        y_center = (
            y_min + y_max
        ) / 2

        width = (
            x_max - x_min
        )

        height = (
            y_max - y_min
        )

        # Reject zero-size boxes.
        if width <= 0 or height <= 0:
            return None

        # Coordinates should remain normalized.
        if not (
            0 <= x_center <= 1
            and 0 <= y_center <= 1
            and 0 < width <= 1
            and 0 < height <= 1
        ):
            return None

        return (
            f"{new_class_id} "
            f"{x_center:.6f} "
            f"{y_center:.6f} "
            f"{width:.6f} "
            f"{height:.6f}"
        )

    return None


def process_dataset(
    dataset_path,
    mapping,
    dataset_name
):
    print(
        f"\nProcessing {dataset_name}..."
    )

    total_images = 0
    total_labels = 0
    total_boxes = 0
    skipped_annotations = 0

    split_counts = {}

    for split in [
        "train",
        "valid",
        "test"
    ]:
        image_dir = (
            dataset_path
            / split
            / "images"
        )

        label_dir = (
            dataset_path
            / split
            / "labels"
        )

        if not image_dir.exists():
            print(
                f"Skipping missing split: {split}"
            )
            continue

        output_image_dir = (
            FINAL_DATASET
            / split
            / "images"
        )

        output_label_dir = (
            FINAL_DATASET
            / split
            / "labels"
        )

        split_images = 0
        split_labels = 0
        split_boxes = 0

        for image_path in image_dir.iterdir():
            if (
                image_path.suffix.lower()
                not in IMAGE_EXTENSIONS
            ):
                continue

            unique_id = uuid.uuid4().hex[:10]

            new_stem = (
                f"{dataset_name}_{unique_id}"
            )

            new_image_path = (
                output_image_dir
                / (
                    new_stem
                    + image_path.suffix.lower()
                )
            )

            shutil.copy2(
                image_path,
                new_image_path
            )

            total_images += 1
            split_images += 1

            old_label_path = (
                label_dir
                / f"{image_path.stem}.txt"
            )

            if not old_label_path.exists():
                continue

            new_lines = []

            with open(
                old_label_path,
                "r",
                encoding="utf-8"
            ) as file:
                for line in file:
                    line = line.strip()

                    if not line:
                        continue

                    parts = line.split()

                    try:
                        old_class_id = int(
                            parts[0]
                        )
                    except (
                        ValueError,
                        IndexError
                    ):
                        skipped_annotations += 1
                        continue

                    if old_class_id not in mapping:
                        skipped_annotations += 1
                        continue

                    new_class_id = mapping[
                        old_class_id
                    ]

                    new_line = convert_annotation(
                        parts,
                        new_class_id
                    )

                    if new_line is None:
                        skipped_annotations += 1
                        continue

                    new_lines.append(
                        new_line
                    )

                    total_boxes += 1
                    split_boxes += 1

            if new_lines:
                new_label_path = (
                    output_label_dir
                    / f"{new_stem}.txt"
                )

                with open(
                    new_label_path,
                    "w",
                    encoding="utf-8"
                ) as file:
                    file.write(
                        "\n".join(new_lines)
                        + "\n"
                    )

                total_labels += 1
                split_labels += 1

        split_counts[split] = {
            "images": split_images,
            "labels": split_labels,
            "boxes": split_boxes,
        }

    print(
        f"Images copied: {total_images}"
    )

    print(
        f"Label files created: {total_labels}"
    )

    print(
        f"Bounding boxes converted: {total_boxes}"
    )

    print(
        f"Skipped annotations: {skipped_annotations}"
    )

    for split, counts in split_counts.items():
        print(
            f"  {split}: "
            f"{counts['images']} images, "
            f"{counts['labels']} labels, "
            f"{counts['boxes']} boxes"
        )


def create_yaml():
    yaml_content = """path: C:/Users/shami/Documents/my-react-app/backend/ai/final_dataset

train: train/images
val: valid/images
test: test/images

names:
  0: person
  1: car
  2: motorcycle
  3: bicycle
  4: helmet
  5: no_helmet
"""

    yaml_path = (
        FINAL_DATASET
        / "data.yaml"
    )

    with open(
        yaml_path,
        "w",
        encoding="utf-8"
    ) as file:
        file.write(
            yaml_content
        )


def main():
    print(
        "Creating final VisionAI dataset..."
    )

    create_structure()

    process_dataset(
        HELMET_DATASET,
        HELMET_MAPPING,
        "helmet"
    )

    process_dataset(
        VEHICLE_DATASET,
        VEHICLE_MAPPING,
        "vehicle"
    )

    process_dataset(
        MOTORCYCLE_DATASET,
        MOTORCYCLE_MAPPING,
        "motorcycle"
    )

    create_yaml()

    print(
        "\n==================================="
    )

    print(
        "FINAL DATASET CREATED SUCCESSFULLY"
    )

    print(
        "==================================="
    )

    print(
        f"\nLocation:\n{FINAL_DATASET}"
    )

    print(
        "\nFinal classes:"
    )

    for (
        name,
        class_id
    ) in FINAL_CLASSES.items():
        print(
            f"{class_id} = {name}"
        )


if __name__ == "__main__":
    main()