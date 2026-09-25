from pathlib import Path

DATASET = Path(
    r"C:\Users\shami\Documents\my-react-app\backend\ai\final_dataset"
)

VALID_CLASS_IDS = {0, 1, 2, 3, 4, 5}

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".bmp", ".webp"
}


def validate_split(split):
    print(f"\nChecking {split}...")

    image_dir = DATASET / split / "images"
    label_dir = DATASET / split / "labels"

    images = {
        p.stem: p
        for p in image_dir.iterdir()
        if p.suffix.lower() in IMAGE_EXTENSIONS
    }

    labels = {
        p.stem: p
        for p in label_dir.glob("*.txt")
    }

    errors = []
    total_boxes = 0
    class_counts = {i: 0 for i in VALID_CLASS_IDS}

    # Check labels
    for stem, label_path in labels.items():

        if stem not in images:
            errors.append(
                f"Label without image: {label_path.name}"
            )

        with open(
            label_path,
            "r",
            encoding="utf-8"
        ) as f:

            for line_number, line in enumerate(f, start=1):

                parts = line.strip().split()

                if len(parts) != 5:
                    errors.append(
                        f"{label_path.name}, line {line_number}: "
                        f"expected 5 values, got {len(parts)}"
                        f"CONTENT: {line[:300]}"
                    )
                    continue

                try:
                    class_id = int(parts[0])
                    x, y, w, h = map(float, parts[1:])
                except ValueError:
                    errors.append(
                        f"{label_path.name}, line {line_number}: "
                        "invalid number"
                    )
                    continue

                if class_id not in VALID_CLASS_IDS:
                    errors.append(
                        f"{label_path.name}, line {line_number}: "
                        f"invalid class {class_id}"
                    )

                if not (
                    0 <= x <= 1
                    and 0 <= y <= 1
                    and 0 < w <= 1
                    and 0 < h <= 1
                ):
                    errors.append(
                        f"{label_path.name}, line {line_number}: "
                        f"invalid box {x} {y} {w} {h}"
                    )

                if class_id in VALID_CLASS_IDS:
                    class_counts[class_id] += 1

                total_boxes += 1

    images_without_labels = [
        name for name in images
        if name not in labels
    ]

    print(f"Images: {len(images)}")
    print(f"Label files: {len(labels)}")
    print(f"Bounding boxes: {total_boxes}")
    print(f"Images without labels: {len(images_without_labels)}")

    print("\nClass counts:")

    class_names = {
        0: "person",
        1: "car",
        2: "motorcycle",
        3: "bicycle",
        4: "helmet",
        5: "no_helmet",
    }

    for class_id in sorted(class_counts):
        print(
            f"  {class_id} {class_names[class_id]}: "
            f"{class_counts[class_id]}"
        )

    if errors:
        print(f"\nERRORS FOUND: {len(errors)}")

        # Don't flood terminal with thousands of lines
        for error in errors[:20]:
            print(" -", error)

        if len(errors) > 20:
            print(
                f"... plus {len(errors) - 20} more errors"
            )
    else:
        print("\nNo annotation errors found. ✓")

    return len(errors)


def main():

    print("================================")
    print("VisionAI Dataset Validation")
    print("================================")

    total_errors = 0

    for split in ["train", "valid", "test"]:
        total_errors += validate_split(split)

    print("\n================================")

    if total_errors == 0:
        print("DATASET VALIDATION PASSED ✓")
    else:
        print(
            f"DATASET VALIDATION FAILED: "
            f"{total_errors} errors"
        )

    print("================================")


if __name__ == "__main__":
    main()