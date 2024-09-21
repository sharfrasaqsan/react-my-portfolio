import React from "react";
import "./styles/ProjectList.css";
import ProjectCard from "./ProjectCard";

import pcns from "../assets/images/projects/pcns.png";
import royalReserve from "../assets/images/projects/royalreserve.png";
import portfolio from "../assets/images/projects/portfolio.png";

const projects = [
  {
    title: "Ecommerce Website - PC & NETWORK SOLUTIONS",
    description:
      "An e-commerce website for PC & network solutions allowing customers to browse products, complete transactions securely using PayPal, and manage their accounts.",
    technologies: [
      "NextJS",
      "NodeJS",
      "ExpressJS",
      "MongoDB",
      "Bootstrap",
      "JQuery",
      "PayPal",
    ],
    screenshot: pcns,
    liveLink: null,
    repoLink: "https://github.com/sharfrasaqsan/finalYear-ecommerceProject.git",
  },
  {
    title: "Royal Reserve Hotel Booking Website",
    description: `"Royal Reserved" is a sophisticated hotel booking website designed to provide users with a seamless experience in finding and reserving accommodations for their travels. With its intuitive interface and comprehensive features, Royal Reserved caters to both leisure and business travelers, offering a wide selection of hotels, resorts, and other lodging options worldwide.`,
    technologies: ["WordPress", "MySQL", "PHP", "CSS", "jQuery", "Elementor"],
    screenshot: royalReserve,
    liveLink: "https://royalreserve.netlify.app/",
    repoLink: null,
  },
  {
    title: "My Portfolio Website",
    description:
      "A personal portfolio website that serves as a vital tool for establishing a strong online presence and shaping my professional brand. It showcases my skills, projects, educational background, and career journey, offering a competitive edge in job seeking, freelancing, and entrepreneurship.",
    technologies: ["HTML", "CSS & SCSS", "JavaScript", "Bootstrap", "JQuery"],
    screenshot: portfolio,
    liveLink: "https://sharfrasaqsan.netlify.app/",
    repoLink: "https://github.com/sharfrasaqsan/Portfolio.git",
  },
];

const ProjectList = () => {
  return (
    <div className="project-list">
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
