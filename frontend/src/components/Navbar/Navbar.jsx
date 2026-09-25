import { Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Clickable VisionAI Logo */}
        <Link to="/" className="navbar-brand">
          <div className="logo">
            <div className="logo-icon">
              <Sparkles size={18} />
            </div>

            <span>VisionAI</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;