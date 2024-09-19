import React from "react";
import { Link } from "react-router-dom";
import "./styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to My Portfolio</h1>
        <p className="hero-description">
          Explore my projects, skills, and experiences. Let's connect and work
          together to create something amazing.
        </p>
        <Link to="/contact" className="hero-button">
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default Hero;
