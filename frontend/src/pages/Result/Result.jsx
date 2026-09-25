import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle2,
  RotateCcw,
  ScanSearch,
  Image as ImageIcon,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const imageUrl = location.state?.imageUrl;
  const fileName = location.state?.fileName;
  const result = location.state?.result;

  const detections = result?.detections || [];

  const hasNoHelmet = detections.some(
    (detection) => detection.label === "no_helmet"
  );

  const hasHelmet = detections.some(
    (detection) => detection.label === "helmet"
  );

  const [imageSize, setImageSize] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
  });

  const handleImageLoad = (event) => {
    setImageSize({
      naturalWidth: event.target.naturalWidth,
      naturalHeight: event.target.naturalHeight,
    });
  };

  const formatLabel = (label) => {
    return label.replaceAll("_", " ");
  };

  return (
    <div className="app">
      <Navbar />

      <main className="result-page">
        <div className="result-container">

          {/* Header */}
          <div className="result-header">
            <div className="result-success-icon">
              <CheckCircle2 size={26} />
            </div>

            <div>
              <p className="result-eyebrow">
                ANALYSIS COMPLETE
              </p>

              <h1>AI Detection Results</h1>

              <p className="result-description">
                VisionAI analyzed your image and detected{" "}
                <strong>{detections.length}</strong>{" "}
                {detections.length === 1 ? "object" : "objects"}.
              </p>
            </div>
          </div>

          {/* Main Result Card */}
          <div className="result-card polished-result-card">

            {/* Image side */}
            <div className="result-image-section">

              <div className="result-section-title">
                <div>
                  <ImageIcon size={18} />
                  <span>Analyzed Image</span>
                </div>

                <div className="result-status-badges">
                  <span className="result-detection-count">
                    {detections.length} detections
                  </span>

                  {hasNoHelmet && (
                    <span className="violation-badge">
                      Safety Violation
                    </span>
                  )}

                  {!hasNoHelmet && hasHelmet && (
                    <span className="safe-badge">
                      Helmet Detected
                    </span>
                  )}
                </div>
              </div>

              <div className="result-image">
                {imageUrl ? (
                  <div className="detection-image-wrapper">
                    <img
                      src={imageUrl}
                      alt={fileName || "Uploaded image"}
                      className="image-preview"
                      onLoad={handleImageLoad}
                    />

                    {imageSize.naturalWidth > 0 &&
                      detections.map((detection, index) => {
                        if (!detection.bbox) return null;

                        const { x1, y1, x2, y2 } =
                          detection.bbox;

                        const left =
                          (x1 / imageSize.naturalWidth) * 100;

                        const top =
                          (y1 / imageSize.naturalHeight) * 100;

                        const width =
                          ((x2 - x1) /
                            imageSize.naturalWidth) *
                          100;

                        const height =
                          ((y2 - y1) /
                            imageSize.naturalHeight) *
                          100;

                        return (
                          <div
                            key={index}
                            className={`detection-box detection-${detection.label}`}
                            style={{
                              left: `${left}%`,
                              top: `${top}%`,
                              width: `${width}%`,
                              height: `${height}%`,
                            }}
                          >
                            <span className="detection-label">
                              {formatLabel(detection.label)}{" "}
                              {detection.confidence}%
                            </span>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="image-placeholder">
                    No image selected
                  </div>
                )}
              </div>

              {fileName && (
                <p className="result-filename">
                  {fileName}
                </p>
              )}
            </div>

            {/* Detection side */}
            <div className="result-content polished-result-content">

              <div className="result-section-title">
                <div>
                  <ScanSearch size={19} />
                  <span>Detected Objects</span>
                </div>
              </div>

              {detections.length > 0 ? (
                <div className="detections-list">
                  {detections.map((detection, index) => (
                    <div
                      className={`detection-result-row result-${detection.label}`}
                      key={index}
                    >
                      <div className="detection-row-top">
                        <div className="detection-name-area">
                          <span className="detection-dot"></span>

                          <strong>
                            {formatLabel(detection.label)}
                          </strong>
                        </div>

                        <span className="confidence-value">
                          {detection.confidence}%
                        </span>
                      </div>

                      <div className="confidence-track">
                        <div
                          className="confidence-fill"
                          style={{
                            width: `${detection.confidence}%`,
                          }}
                        ></div>
                      </div>

                      <span className="confidence-caption">
                        Detection confidence
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-detections">
                  <ScanSearch size={35} />

                  <strong>No objects detected</strong>

                  <span>
                    Try another image with clearer objects.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="result-actions">
            <button
              className="analyze-button result-another-button"
              onClick={() => navigate("/")}
            >
              <RotateCcw size={18} />
              Analyze Another Image
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Result;