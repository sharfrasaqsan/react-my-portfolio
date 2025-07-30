import { useState, useEffect } from "react";
import "../styles/Header.css";
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import Lougout from "./Lougout";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header-container">
      <div className="header-logo">
        <Link to="/" className="header-brand">
          Mohamed Sharfiras
        </Link>
      </div>
      <div className={`header-nav ${menuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/skills"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact
            </NavLink>
          </li>
          {!user ? (
            <li>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Admin Login
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>

      <Lougout />

      <div className="theme-toggle">
        <button className="toggle-button" onClick={toggleDarkMode}>
          {isDarkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
        </button>
      </div>

      {/* Mobile menu toggle button */}
      <div className="mobile-menu-toggle">
        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
