from pathlib import Path
import random
import shutil

# Original motorcycle dataset
DATASET = Path(r"C:\AI\Motorcycle-train.v1i.yolov11")

TRAIN_IMAGES = DATASET / "train" / "images"
TRAIN_LABELS = DATASET / "train" / "labels"

VALID_IMAGES = DATASET / "valid" / "images"
VALID_LABELS = DATASET / "valid" / "labels"

TEST_IMAGES = DATASET / "test" / "images"
TEST_LABELS = DATASET / "test" / "labels"

# Fixed seed = same split every time
random.seed(42)

# Supported image formats
IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp",
}


def main():
    print("Preparing motorcycle dataset split...")

    # Create valid/test folders
    VALID_IMAGES.mkdir(parents=True, exist_ok=True)
    VALID_LABELS.mkdir(parents=True, exist_ok=True)

    TEST_IMAGES.mkdir(parents=True, exist_ok=True)
    TEST_LABELS.mkdir(parents=True, exist_ok=True)

    # Get all training images
    images = [
        image
        for image in TRAIN_IMAGES.iterdir()
        if image.suffix.lower() in IMAGE_EXTENSIONS
    ]

    total = len(images)

    print(f"Total motorcycle images found: {total}")

    if total == 0:
        print("ERROR: No motorcycle images found.")
        return

    random.shuffle(images)

    # 80 / 10 / 10 split
    valid_count = round(total * 0.10)
    test_count = round(total * 0.10)

    valid_images = images[:valid_count]

    test_images = images[
        valid_count:valid_count + test_count
    ]

    train_images = images[
        valid_count + test_count:
    ]

    print("\nNew split:")
    print(f"Train: {len(train_images)}")
    print(f"Valid: {len(valid_images)}")
    print(f"Test:  {len(test_images)}")

    # Move selected files
    move_files(
        valid_images,
        VALID_IMAGES,
        VALID_LABELS
    )

    move_files(
        test_images,
        TEST_IMAGES,
        TEST_LABELS
    )

    print("\n====================================")
    print("MOTORCYCLE DATASET SPLIT SUCCESSFUL")
    print("====================================")


def move_files(images, destination_images, destination_labels):

    moved_images = 0
    moved_labels = 0

    for image_path in images:

        # Move image
        destination_image = (
            destination_images / image_path.name
        )

        shutil.move(
            str(image_path),
            str(destination_image)
        )

        moved_images += 1

        # Find corresponding YOLO label
        label_path = TRAIN_LABELS / (
            image_path.stem + ".txt"
        )

        if label_path.exists():

            destination_label = (
                destination_labels / label_path.name
            )

            shutil.move(
                str(label_path),
                str(destination_label)
            )

            moved_labels += 1

    print(
        f"Moved {moved_images} images "
        f"and {moved_labels} labels."
    )


if __name__ == "__main__":
    main()