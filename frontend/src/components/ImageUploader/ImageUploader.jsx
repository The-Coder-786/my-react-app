import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Image as ImageIcon,
  X,
  CircleAlert,
} from "lucide-react";

function ImageUploader() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  // Validate and select image
  const processFile = (file) => {
    if (!file) return;

    setError("");

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(
        "Unsupported file type. Please upload a JPG, JPEG, PNG, or WEBP image."
      );
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        "Image is too large. Please upload an image smaller than 10 MB."
      );
      return;
    }

    // Remove previous preview URL
    if (selectedImage?.url) {
      URL.revokeObjectURL(selectedImage.url);
    }

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage({
      file,
      url: imageUrl,
    });
  };

  // Normal click-to-upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    processFile(file);

    // Allows selecting the same file again later
    event.target.value = "";
  };

  // Drag enters upload area
  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  // File is being dragged over upload area
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  // Drag leaves upload area
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  // File dropped
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const files = event.dataTransfer.files;

    if (!files || files.length === 0) {
      return;
    }

    if (files.length > 1) {
      setError("Please upload only one image at a time.");
      return;
    }

    processFile(files[0]);
  };

  const removeImage = () => {
    if (selectedImage?.url) {
      URL.revokeObjectURL(selectedImage.url);
    }

    setSelectedImage(null);
    setError("");
    setIsDragging(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      setError("Please select an image before analyzing.");
      return;
    }

    navigate("/loading", {
      state: {
        imageUrl: selectedImage.url,
        fileName: selectedImage.file.name,
        file: selectedImage.file,
      },
    });
  };

  return (
    <div className="uploader-container">
      {!selectedImage ? (
        <>
          <div
            className={`upload-box ${isDragging ? "dragging" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-icon">
              <Upload size={28} />
            </div>

            <h3>
              {isDragging
                ? "Drop your image here"
                : "Upload an image"}
            </h3>

            <p>
              {isDragging
                ? "Release to upload your image"
                : "Click to browse or drag and drop your image here"}
            </p>

            <span>PNG, JPG, JPEG or WEBP • Max 10 MB</span>

            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />
          </div>

          {error && (
            <div className="upload-error">
              <CircleAlert size={18} />
              <span>{error}</span>
            </div>
          )}
        </>
      ) : (
        <div className="preview-container">
          <div className="preview-header">
            <div className="preview-title">
              <ImageIcon size={20} />

              <span>{selectedImage.file.name}</span>
            </div>

            <button
              type="button"
              className="remove-button"
              onClick={removeImage}
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
          </div>

          <img
            src={selectedImage.url}
            alt="Selected"
            className="image-preview"
          />

          <button
            type="button"
            className="analyze-button"
            onClick={handleAnalyze}
          >
            Analyze Image
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;