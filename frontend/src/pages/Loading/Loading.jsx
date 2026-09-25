import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle, Sparkles } from "lucide-react";
import { analyzeImage } from "../../services/api";

function Loading() {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    const file = location.state?.file;

    // Protect /loading from direct access or refresh
    if (!file) {
      navigate("/", { replace: true });
      return;
    }

    const runAnalysis = async () => {
      try {
        const result = await analyzeImage(file);

        navigate("/result", {
          replace: true,
          state: {
            imageUrl: location.state?.imageUrl,
            fileName: location.state?.fileName,
            result: result,
          },
        });
      } catch (error) {
        console.error("VisionAI analysis error:", error);

        setError(
          "Something went wrong while analyzing the image. Please try again."
        );
      }
    };

    runAnalysis();
  }, [location.state, navigate]);

  if (error) {
    return (
      <div className="loading-page">
        <div className="loading-card">
          <h1>Analysis Failed</h1>

          <p>{error}</p>

          <button
            type="button"
            className="analyze-button"
            onClick={() => navigate("/", { replace: true })}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-page">
      <div className="loading-card">
        <div className="loading-icon">
          <Sparkles size={28} />
        </div>

        <LoaderCircle
          className="loading-spinner"
          size={42}
        />

        <h1>Analyzing your image</h1>

        <p>
          Our AI is processing the image and detecting objects.
          Please wait a moment.
        </p>

        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>

        <span className="loading-status">
          AI analysis in progress...
        </span>
      </div>
    </div>
  );
}

export default Loading;