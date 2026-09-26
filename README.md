# 👁️ VisionAI — AI-Powered Object Detection

VisionAI is a full-stack AI-powered object detection web application that allows users to upload an image and automatically detect objects using a **custom-trained YOLO11 model**.

The application provides an easy-to-use React interface, a FastAPI backend, and visual detection results including bounding boxes, object labels, and confidence scores.

A key feature of VisionAI is that the object detection model runs **locally/offline**. The application does not depend on an external AI inference API to perform detections.

---

## 🚀 Features

- 📤 Upload images from your computer
- 🖱️ Real drag-and-drop image upload
- 🤖 AI-powered object detection
- 🎯 Custom-trained YOLO11 model
- 💻 Local/offline AI inference
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

When an image is submitted, the frontend sends it to the FastAPI backend.

The backend runs inference locally using the custom-trained YOLO11 model and returns the detected objects, confidence scores, and bounding-box coordinates.

The React frontend then visualizes those results directly on the original image.

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
- Custom-trained YOLO model

### Development & Version Control

- VS Code
- Git
- GitHub
- Git LFS

---

## 📁 Project Structure

```text
my-react-app/
│
├── backend/
│   ├── ai/
│   │   ├── best.pt
│   │   │
│   │   ├── dataset/
│   │   │   └── data.yaml
│   │   │
│   │   ├── training/
│   │   │   ├── merge_datasets.py
│   │   │   ├── split_motorcycle.py
│   │   │   └── validate_dataset.py
│   │   │
│   │   ├── final_dataset.zip.part001
│   │   ├── final_dataset.zip.part002
│   │   └── final_dataset.zip.part003
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │
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
├── .gitattributes
├── .gitignore
└── README.md
```

---

# 📦 Training Dataset

VisionAI was trained using a custom-prepared object detection dataset.

The dataset was collected/combined, processed, validated, and organized for YOLO object detection.

The final dataset contains images and YOLO-format annotations for the six VisionAI classes:

- Person
- Car
- Motorcycle
- Bicycle
- Helmet
- No Helmet

The complete extracted dataset is approximately **2.3 GB** and contains more than **41,000 files**.

Because of its size, the dataset is stored in this repository as a compressed ZIP archive split into multiple parts and managed using **Git LFS (Large File Storage)**.

The parts are:

```text
backend/ai/final_dataset.zip.part001
backend/ai/final_dataset.zip.part002
backend/ai/final_dataset.zip.part003
```

> **Important:** The dataset is only required if you want to inspect the training data or retrain/improve the model. It is **not required to run object detection**, because the trained `best.pt` model is already included.

---

# 💻 Running VisionAI Locally

Follow these instructions to run the complete project on your computer.

## 1. Prerequisites

Make sure you have installed:

- Git
- Git LFS
- Python 3
- Node.js
- npm

Check your installations:

```bash
git --version
git lfs version
python --version
node --version
npm --version
```

On Windows, if `python` is unavailable but the Python launcher is installed, use:

```powershell
py --version
```

---

## 2. Configure Git LFS

The training dataset is stored using Git LFS.

Initialize Git LFS before cloning:

```bash
git lfs install
```

You only normally need to initialize Git LFS once on your computer.

---

## 3. Clone the Repository

Clone VisionAI:

```bash
git clone https://github.com/The-Coder-786/my-react-app.git
```

Enter the project:

```bash
cd my-react-app
```

A normal clone with Git LFS installed should retrieve the LFS-managed dataset parts.

If necessary, manually retrieve the LFS files using:

```bash
git lfs pull
```

---

# ⚡ Quick Start — Run VisionAI

If you only want to **run the application and perform object detection**, you do not need to reconstruct or extract the training dataset.

The included model:

```text
backend/ai/best.pt
```

is sufficient for inference.

---

# ⚙️ Backend Setup

Open a terminal in the project directory.

Go to the backend:

```bash
cd backend
```

### Create a Virtual Environment

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

### Install Python Dependencies

```bash
python -m pip install -r requirements.txt
```

The backend dependencies include FastAPI, Uvicorn, Python Multipart, Ultralytics, and the packages required by the YOLO model.

### Start the FastAPI Server

```bash
python -m uvicorn main:app --reload
```

The backend should now be available at:

```text
http://127.0.0.1:8000
```

FastAPI interactive API documentation:

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
http://localhost:5173/
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

The complete runtime flow is:

```text
Image
  ↓
React Frontend
  ↓
FastAPI REST API
  ↓
Custom YOLO11 Model (best.pt)
  ↓
Local AI Inference
  ↓
Detected Objects
  ↓
Bounding Boxes + Labels + Confidence Scores
```

---

# 📦 Reconstructing the Full Training Dataset

You only need to follow this section if you want access to the **training dataset**.

After cloning, make sure all Git LFS files have been downloaded:

```bash
git lfs pull
```

You should have:

```text
backend/ai/final_dataset.zip.part001
backend/ai/final_dataset.zip.part002
backend/ai/final_dataset.zip.part003
```

## Windows PowerShell

From the project root, run:

```powershell
$parts = Get-ChildItem ".\backend\ai\final_dataset.zip.part*" |
    Sort-Object Name

$output = [System.IO.File]::Create(
    ".\backend\ai\final_dataset.zip"
)

try {
    foreach ($part in $parts) {
        $input = [System.IO.File]::OpenRead($part.FullName)

        try {
            $input.CopyTo($output)
        }
        finally {
            $input.Close()
        }
    }
}
finally {
    $output.Close()
}
```

This reconstructs:

```text
backend/ai/final_dataset.zip
```

Now extract it:

```powershell
Expand-Archive `
  -Path ".\backend\ai\final_dataset.zip" `
  -DestinationPath ".\backend\ai\final_dataset"
```

After extraction, the complete training dataset will be available locally.

The reconstructed ZIP and extracted dataset are ignored by Git, so they will not accidentally be committed back into the repository.

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

The application can perform AI inference locally after its dependencies have been installed. Internet access is not required for each object-detection request.

---

## 👨‍💻 Author

**Shameer Hayat**

Computer Science Graduate  
AI / Machine Learning & Software Development

---

## ⭐ Support

If you find VisionAI useful or interesting, consider giving the repository a ⭐ on GitHub.