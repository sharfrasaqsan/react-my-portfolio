import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [project, setProject] = useState({
    title: "",
    shortDescription: "",
    description: "",
    technologies: [],
    screenshot: "",
    liveLink: "",
    repoLink: "",
    createdAt: "",
    updatedAt: "",
  });
  const [editProject, setEditProject] = useState({
    title: "",
    shortDescription: "",
    description: "",
    technologies: [],
    screenshot: "",
    liveLink: "",
    repoLink: "",
    createdAt: "",
    updatedAt: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <DataContext.Provider
      value={{
        projects,
        setProjects,
        admin,
        setAdmin,
        project,
        setProject,
        editProject,
        setEditProject,
        navigate,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  useContext(DataContext);
};
