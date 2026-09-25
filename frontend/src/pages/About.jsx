import {
  BrainCircuit,
  ScanSearch,
  ShieldCheck,
  Upload,
  Cpu,
  BarChart3,
} from "lucide-react";

import Navbar from "../components/Navbar/Navbar";

function About() {
  return (
    <div className="app">
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <p className="about-eyebrow">ABOUT VISIONAI</p>

          <h1>Intelligent Object Detection Made Simple</h1>

          <p>
            VisionAI is an AI-powered image analysis platform that
            detects and identifies objects from uploaded images using
            a custom-trained YOLO object detection model.
          </p>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <h2>What VisionAI Detects</h2>
            <p>
              Our current AI model is trained to recognize six object
              classes.
            </p>
          </div>

          <div className="class-grid">
            <div className="class-card">
              <span>01</span>
              <strong>Person</strong>
            </div>

            <div className="class-card">
              <span>02</span>
              <strong>Car</strong>
            </div>

            <div className="class-card">
              <span>03</span>
              <strong>Motorcycle</strong>
            </div>

            <div className="class-card">
              <span>04</span>
              <strong>Bicycle</strong>
            </div>

            <div className="class-card">
              <span>05</span>
              <strong>Helmet</strong>
            </div>

            <div className="class-card">
              <span>06</span>
              <strong>No Helmet</strong>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <h2>How It Works</h2>
            <p>
              From image upload to AI detection in three simple steps.
            </p>
          </div>

          <div className="how-grid">
            <div className="how-card">
              <div className="about-icon">
                <Upload size={24} />
              </div>

              <span>STEP 01</span>
              <h3>Upload Image</h3>

              <p>
                Select an image from your device and upload it to
                VisionAI.
              </p>
            </div>

            <div className="how-card">
              <div className="about-icon">
                <Cpu size={24} />
              </div>

              <span>STEP 02</span>
              <h3>AI Analysis</h3>

              <p>
                The image is sent securely to the FastAPI backend and
                analyzed by our trained YOLO model.
              </p>
            </div>

            <div className="how-card">
              <div className="about-icon">
                <ScanSearch size={24} />
              </div>

              <span>STEP 03</span>
              <h3>View Results</h3>

              <p>
                VisionAI displays detected objects, bounding boxes and
                confidence scores.
              </p>
            </div>
          </div>
        </section>

        <section className="technology-section">
          <div className="technology-content">
            <p className="about-eyebrow">TECHNOLOGY</p>

            <h2>Built with modern AI technology</h2>

            <p>
              VisionAI combines a React frontend with a FastAPI
              backend and a custom-trained YOLO11 object detection
              model.
            </p>

            <div className="technology-tags">
              <span>React</span>
              <span>FastAPI</span>
              <span>Python</span>
              <span>YOLO11</span>
              <span>PyTorch</span>
            </div>
          </div>

          <div className="technology-visual">
            <BrainCircuit size={65} />

            <strong>VisionAI</strong>

            <span>Custom Object Detection</span>
          </div>
        </section>

        <section className="about-features">
          <div>
            <ShieldCheck size={23} />
            <strong>Custom Trained Model</strong>
            <span>
              Trained for VisionAI's six detection classes.
            </span>
          </div>

          <div>
            <ScanSearch size={23} />
            <strong>Visual Detection</strong>
            <span>
              Bounding boxes identify detected objects directly on the
              image.
            </span>
          </div>

          <div>
            <BarChart3 size={23} />
            <strong>Confidence Scores</strong>
            <span>
              Each prediction includes the model's detection
              confidence.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;