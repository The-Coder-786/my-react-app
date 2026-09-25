import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";

function NotFound() {
  return (
    <div className="app">
      <Navbar />

      <main className="not-found-page">
        <div className="not-found-content">
          <div className="not-found-icon">
            <SearchX size={38} />
          </div>

          <span className="not-found-code">404</span>

          <h1>Page Not Found</h1>

          <p>
            The page you're looking for doesn't exist or may have
            been moved.
          </p>

          <Link to="/" className="not-found-button">
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;