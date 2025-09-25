import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import Lougout from "./Lougout";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  // Read initial theme from <html data-bs-theme> or localStorage
  const initial =
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-bs-theme") ||
        localStorage.getItem("theme") ||
        "light"
      : "light";

  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="py-2 sticky-top z-index-header">
      <nav className="navbar navbar-expand-lg glass container-xxl px-3 py-2">
        <Link className="navbar-brand fw-semibold" to="/">
          Mohamed Sharfiras
        </Link>

        <button
          className="navbar-toggler btn-glass"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/skills", label: "Skills" },
              { to: "/projects", label: "Projects" },
              { to: "/blogs", label: "Blogs" },
              { to: "/contact", label: "Contact" },
              { to: "/admin", label: "Admin Panel" },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-semibold" : "")
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {!user && (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-semibold" : "")
                  }
                >
                  Admin Login
                </NavLink>
              </li>
            )}

            {/* Logout as a nav item */}
            <li className="nav-item">
              <Lougout />
            </li>

            {/* Theme toggle */}
            <li className="nav-item ms-lg-2">
              <div className="d-flex align-items-center gap-2">
                <span className="d-none d-lg-inline small">Theme</span>
                <div
                  className="input-group input-group-sm"
                  role="group"
                  aria-label="Theme toggle"
                >
                  <button
                    className={
                      "btn btn-glass" + (theme === "light" ? " active" : "")
                    }
                    onClick={() => setTheme("light")}
                    type="button"
                    aria-pressed={theme === "light"}
                    title="Light"
                  >
                    <FiSun aria-hidden />
                  </button>
                  <button
                    className={
                      "btn btn-glass" + (theme === "dark" ? " active" : "")
                    }
                    onClick={() => setTheme("dark")}
                    type="button"
                    aria-pressed={theme === "dark"}
                    title="Dark"
                  >
                    <FiMoon aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
