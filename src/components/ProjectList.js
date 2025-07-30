import "../styles/ProjectList.css";
import ProjectCard from "./ProjectCard";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";

// const projects = [
//   {
//     title: "Expense Tracker Website - Spend Wise",
//     description: `"SpendWise" is a web-based expense tracker for managing finances by recording and categorizing expenses. Features a user-friendly interface for tracking spending, viewing history, and gaining financial insights.`,
//     technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Font Awesome"],
//     screenshot: spendwise,
//     liveLink: "https://myspendwise.netlify.app/",
//     repoLink: "https://github.com/sharfrasaqsan/SpendWise.git",
//   },
// ];

const ProjectList = () => {
  const { projects, loading } = useData();

  if (loading) return <Loading />;
  if (projects.length === 0)
    return <p className="no-projects-found">No projects found!</p>;

  return (
    <div className="project-list">
      <h2>Projects</h2>

      {/* Optional Search Bar (if needed later) */}
      {/* 
      <form className="project-search-form">
        <input type="text" placeholder="Search projects..." />
      </form>
      */}

      {projects.reverse().map((project) => (
        <div key={project.id} className="project-card-section">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
