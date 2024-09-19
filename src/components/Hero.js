import React from "react";
import { Link } from "react-router-dom";
import "./styles/Hero.css";
import photo_dp from "../assets/images/DP.png";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-photo">
          <img src={photo_dp} alt="Profile" className="hero-profile-img" />
        </div>
        <h1 className="hero-title">Hello, I'm A. Mohamed Sharfiras</h1>
        <p className="hero-intro">
          I am a Creative Web Developer, passionate about creating innovative
          solutions and connecting with people. I love solving problems and
          building engaging user experiences.
        </p>
        <div className="hero-buttons">
          <Link to="/contact" className="hero-button">
            Get in Touch
          </Link>
          <Link to="/projects" className="hero-button hero-button-secondary">
            My Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
