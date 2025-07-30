import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getDocs(collection(db, "admin"));
        const resData = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAdmin(resData);
      } catch (err) {
        toast.error("Failed to fetch data!", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

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
