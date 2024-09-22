import { React, useState } from "react";
import "./styles/ProjectList.css";
import ProjectCard from "./ProjectCard";

import pcns from "../assets/images/projects/pcns (1).png";
import royalReserve from "../assets/images/projects/royalreserve.png";
import portfolio from "../assets/images/projects/portfolio.png";
import techsolutionpro from "../assets/images/projects/techsolutionpro.png";
import mycityclimate from "../assets/images/projects/mycityclimate.png";
import recipefinder from "../assets/images/projects/recipefinder.png";
import spendwise from "../assets/images/projects/spendwise.png";
import tastybytes from "../assets/images/projects/tastybytes.png";
import techgenius from "../assets/images/projects/tech genius.png";
import happypaws from "../assets/images/projects/happy paws.png";

const projects = [
  {
    title: "E-Shop: PC & Network Solutions",
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
    title: "Royal Reserve: Hotel Booking",
    description: `"Royal Reserved" is a sophisticated hotel booking site offering a seamless experience for finding and reserving accommodations worldwide. It caters to both leisure and business travelers with a wide selection of lodging options.`,
    technologies: ["WordPress", "MySQL", "PHP", "CSS", "jQuery", "Elementor"],
    screenshot: royalReserve,
    liveLink: "https://royalreserve.netlify.app/",
    repoLink: null,
  },
  {
    title: "Portfolio: Showcase",
    description:
      "A personal portfolio website that highlights my skills, projects, education, and career journey, helping to build my online presence and boost opportunities in job seeking, freelancing, and entrepreneurship.",
    technologies: ["HTML", "CSS & SCSS", "JavaScript", "Bootstrap", "JQuery"],
    screenshot: portfolio,
    liveLink: "https://sharfrasaqsan.netlify.app/",
    repoLink: "https://github.com/sharfrasaqsan/Portfolio.git",
  },
  {
    title: "Tech Solution Pro: IT Services",
    description: `"Tech Solution Pro" is a modern and responsive website designed to showcase and promote IT services. It provides a user-friendly interface and highlights various sections such as services, blog posts, client testimonials, and pricing options.`,
    technologies: ["React", "HTML5", "CSS", "JavaScript", "Bootstrap"],
    screenshot: techsolutionpro,
    liveLink: "https://techsolutionpro.vercel.app/",
    repoLink: "https://github.com/sharfrasaqsan/Tech-solution-pro.git",
  },
  {
    title: "Simple Weather Forecast App - MyCityClimate",
    description: `"My City Climate" is a user-friendly weather app providing real-time data and forecasts for cities worldwide. Users can search cities or view popular ones, with dynamic icons and temperature-based backgrounds.`,
    technologies: [
      "React.js",
      "OpenWeatherMap API",
      "FontAwesome Icons",
      "CSS",
      "JavaScript",
    ],
    screenshot: mycityclimate,
    liveLink: "https://mycityclimate.vercel.app/",
    repoLink: "https://github.com/sharfrasaqsan/weather-forecast-app.git",
  },
  {
    title: "Recipe Finder Web App",
    description: `"Recipe Finder" is a platform to discover recipes based on ingredients with comprehensive details and an intuitive interface. Encourages creative cooking with customizable search and detailed recipe information.`,
    technologies: [
      "HTML",
      "CSS (Bulma CSS framework)",
      "JavaScript",
      "Edamam API",
      "Nutritionix API",
      "FontAwesome",
    ],
    screenshot: recipefinder,
    liveLink: "https://simplerecipefinder.netlify.app/",
    repoLink: "https://github.com/sharfrasaqsan/recipefinder.git",
  },
  {
    title: "Expense Tracker Website - Spend Wise",
    description: `"SpendWise" is a web-based expense tracker for managing finances by recording and categorizing expenses. Features a user-friendly interface for tracking spending, viewing history, and gaining financial insights.`,
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Font Awesome"],
    screenshot: spendwise,
    liveLink: "https://myspendwise.netlify.app/",
    repoLink: "https://github.com/sharfrasaqsan/SpendWise.git",
  },
  {
    title: "Tasty Bytes - Frontend Web",
    description: `"Tasty Bytes" is a startup website highlighting web development services with a responsive, user-friendly design. Includes service details, a blog, testimonials, and more, aimed at establishing brand identity and engaging visitors.`,
    technologies: [
      "HTML",
      "CSS & SCSS",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "HSTS",
    ],
    screenshot: tastybytes,
    liveLink: "https://tastybytes.netlify.app/",
    repoLink: "https://github.com/sharfrasaqsan/Tasty_Bytes.git",
  },
  {
    title: "Tech Genius - Frontend Web",
    description: `"Tech Genius" is a tech company website showcasing software development, design, and IT consulting with a modern, responsive design using React, CSS, and PWA technologies. Features social media integration and a contact form.`,
    technologies: ["React", "CSS", "PWA", "Core-js"],
    screenshot: techgenius,
    liveLink: null,
    repoLink: "https://github.com/sharfrasaqsan/Tech-Genius_simple-website.git",
  },
  {
    title: "Happy Paws - Frontend Web",
    description: `"Happy Paws" is a pet store website with detailed pet listings, secure checkout, and customer accounts. It features an interactive map and easy navigation for a seamless shopping experience.`,
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Swiper",
    ],
    screenshot: happypaws,
    liveLink: "https://happypawsofficial.netlify.app/",
    repoLink: "https://github.com/sharfrasaqsan/Happy-Paws.git",
  },
];

const ProjectList = () => {
  const [search, setSearch] = useState("");

  // const filteredProjects = projects.filter(
  //   (project) =>
  //     project.title.toLowerCase().includes(search.toLowerCase()) ||
  //     project.technologies.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredProjects = projects.filter((project) => {
    const searchLower = search.toLowerCase();
    const titleMatch = project.title.toLowerCase().includes(searchLower);
    const techMatch = project.technologies.some((tech) =>
      tech.toLowerCase().includes(searchLower)
    );
    return titleMatch || techMatch;
  });

  return (
    <div className="project-list">
      <h2>Projects</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search project or technology..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {filteredProjects.length > 0 ? (
        filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))
      ) : (
        <p className="no-projects-found">No projects found</p>
      )}
    </div>
  );
};

export default ProjectList;
