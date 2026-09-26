# 👁️ VisionAI — AI-Powered Object Detection

VisionAI is a full-stack AI-powered object detection web application that allows users to upload an image and automatically detect objects using a custom-trained YOLO11 model.

The application provides an easy-to-use React interface, a FastAPI backend, and visual detection results including bounding boxes, object labels, and confidence scores.

---

## 🚀 Features

- 📤 Upload images from your computer
- 🖱️ Drag-and-drop image upload
- 🤖 AI-powered object detection
- 🎯 Custom-trained YOLO11 model
- 🖼️ Bounding boxes displayed directly on detected objects
- 🏷️ Object class labels
- 📊 Detection confidence scores
- 🪖 Helmet and no-helmet detection
- ⚠️ Safety violation indication
- 📱 Responsive web interface
- 🔒 Image type and size validation
- ⚡ FastAPI-powered inference API
- ❌ Custom 404 page
- ℹ️ Dedicated About page

---

## 🎯 Objects VisionAI Can Detect

The current model is trained to detect six classes:

| Class | Object |
|------:|--------|
| 0 | Person |
| 1 | Car |
| 2 | Motorcycle |
| 3 | Bicycle |
| 4 | Helmet |
| 5 | No Helmet |

VisionAI can therefore be used not only for general road-object detection but also for helmet-safety analysis.

---

## 🧠 How It Works

The application follows this pipeline:

```text
Upload Image
     ↓
Image Validation
     ↓
React Frontend
     ↓
FastAPI Backend
     ↓
Custom YOLO11 Model
     ↓
Object Detection
     ↓
Bounding Boxes + Labels + Confidence
     ↓
Results Displayed to User
```

When an image is submitted, the frontend sends it to the FastAPI backend. The backend runs inference using the trained YOLO model and returns the detected objects and bounding-box coordinates.

The React frontend then visualizes those results on the original image.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Lucide React
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- Python Multipart

### AI / Computer Vision

- Ultralytics YOLO11
- PyTorch
- Custom object-detection dataset

---

## 📁 Project Structure

```text
VisionAI/
│
├── backend/
│   ├── ai/
│   │   ├── best.pt
│   │   ├── dataset/
│   │   └── training/
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 💻 Running VisionAI Locally

Follow these instructions to run the complete project on your computer.

## 1. Prerequisites

Make sure you have installed:

- Git
- Python 3
- Node.js
- npm

Check your installations:

```bash
git --version
python --version
node --version
npm --version
```

On Windows, if `python` is unavailable but the Python launcher is installed, use:

```powershell
py --version
```

---

## 2. Clone the Repository

Clone the project:

```bash
git clone https://github.com/YOUR_USERNAME/VisionAI.git
```

Then enter the project directory:

```bash
cd VisionAI
```

> Replace `YOUR_USERNAME` with the GitHub username that owns this repository.

---

# ⚙️ Backend Setup

Open a terminal in the project directory.

Go to the backend:

```bash
cd backend
```

### Create a virtual environment

Windows:

```powershell
py -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Python dependencies

```bash
pip install -r requirements.txt
```

### Start the FastAPI server

```bash
uvicorn main:app --reload
```

The backend should now be available at:

```text
http://127.0.0.1:8000
```

You can also open the FastAPI interactive documentation at:

```text
http://127.0.0.1:8000/docs
```

Keep this terminal running.

---

# 🎨 Frontend Setup

Open a **second terminal** from the project root.

Go to the frontend:

```bash
cd frontend
```

Install the Node.js dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend should normally be available at:

```text
http://localhost:5173
```

Open it in your browser.

---

# 🖼️ Using VisionAI

Once both the backend and frontend are running:

1. Open VisionAI in your browser.
2. Click the image upload area or drag and drop an image.
3. Select a JPG, JPEG, PNG, or WEBP image.
4. Click **Analyze Image**.
5. Wait while the YOLO model processes the image.
6. View the detected objects, bounding boxes, labels, and confidence scores.

The application currently accepts images up to **10 MB**.

---

## 🔌 API

### Analyze Image

```http
POST /analyze
```

The endpoint accepts an uploaded image and returns detection information.

Example response:

```json
{
  "success": true,
  "filename": "example.jpg",
  "detections": [
    {
      "label": "person",
      "confidence": 91.25,
      "bbox": {
        "x1": 120.5,
        "y1": 80.2,
        "x2": 350.7,
        "y2": 590.4
      }
    }
  ],
  "count": 1
}
```

---

## 🤖 Model

VisionAI uses a custom-trained YOLO11 object-detection model.

The trained weights used by the backend are located at:

```text
backend/ai/best.pt
```

The backend loads this model when the FastAPI application starts.

Current inference settings include:

```text
Image size: 640
Confidence threshold: 0.15
IoU threshold: 0.5
```

The relatively low confidence threshold helps retain helmet and no-helmet detections from the current model.

---

## 📈 Current Model Performance

Held-out test evaluation:

| Class | Precision | Recall | mAP50 | mAP50-95 |
|---|---:|---:|---:|---:|
| All | 0.617 | 0.549 | 0.570 | 0.328 |
| Person | 0.658 | 0.692 | 0.702 | 0.440 |
| Car | 0.787 | 0.709 | 0.747 | 0.421 |
| Motorcycle | 0.767 | 0.650 | 0.727 | 0.459 |
| Bicycle | 0.475 | 0.495 | 0.488 | 0.381 |
| Helmet | 0.542 | 0.440 | 0.445 | 0.166 |
| No Helmet | 0.473 | 0.309 | 0.313 | 0.103 |

These results also show areas for future improvement, particularly helmet and no-helmet detection.

---

## 🔮 Future Improvements

Possible future development includes:

- Improve helmet and no-helmet detection accuracy
- Expand and balance the training dataset
- Improve bicycle detection data
- Add video object detection
- Add real-time camera detection
- Add detection history
- Add user accounts
- Store detection results in a database
- Deploy the frontend and backend online

---

## ⚠️ Notes

The current model is intended as a project/demo model and may produce incorrect or missed detections.

Detection confidence and accuracy depend on factors such as image quality, lighting, viewing angle, object size, and similarity to the training data.

---

## 👨‍💻 Author

**Shameer Hayat**

Computer Science Graduate  
AI / Machine Learning & Software Development

---

## ⭐ Support

If you find VisionAI useful or interesting, consider giving the repository a ⭐ on GitHub.
