from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO

import os
import tempfile


app = FastAPI(title="VisionAI API")


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load our trained YOLO model once when backend starts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "ai", "best.pt")

model = YOLO(MODEL_PATH)


@app.get("/")
def root():
    return {
        "message": "VisionAI API is running",
        "model": "YOLO11n - Custom VisionAI Model"
    }


@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):

    # Keep the original file extension
    extension = os.path.splitext(file.filename)[1]

    if not extension:
        extension = ".jpg"

    temp_path = None

    try:
        # Save uploaded image temporarily
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=extension
        ) as temp_file:

            contents = await file.read()
            temp_file.write(contents)

            temp_path = temp_file.name

        # Run our trained YOLO model
        results = model.predict(
            source=temp_path,
            imgsz=640,
            conf=0.15,
            iou=0.5,
            verbose=False
        )

        result = results[0]

        detections = []

        for box in result.boxes:

            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "label": model.names[class_id],

                "confidence": round(
                    confidence * 100,
                    2
                ),

                "bbox": {
                    "x1": round(x1, 2),
                    "y1": round(y1, 2),
                    "x2": round(x2, 2),
                    "y2": round(y2, 2)
                }
            })

        return {
            "success": True,
            "filename": file.filename,
            "detections": detections,
            "count": len(detections)
        }

    finally:

        # Delete temporary image after prediction
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)