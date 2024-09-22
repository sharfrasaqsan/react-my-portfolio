import React, { useState } from "react";
import "./styles/Header.css";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"; // Import icons from react-icons

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the mobile menu
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
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/skills" onClick={() => setMenuOpen(false)}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/blogs" onClick={() => setMenuOpen(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="theme-toggle">
        <button className="toggle-button" onClick={toggleDarkMode}>
          {isDarkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
        </button>
      </div>

      {/* Mobile menu toggle button */}
      <div className="mobile-menu-toggle">
        <button className="menu-button" onClick={toggleMenu}>
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
