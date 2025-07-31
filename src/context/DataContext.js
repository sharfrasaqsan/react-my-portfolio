import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [blogs, setBlogs] = useState([]);

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

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });
  const [editBlog, setEditBlog] = useState({
    title: "",
    content: "",
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
        toast.error(`Failed to fetch data! ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getDocs(collection(db, "projects"));
        const resData = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProjects(resData);
      } catch (err) {
        toast.error(`Failed to fetch data! ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getDocs(collection(db, "blogs"));
        const resData = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogs(resData);
      } catch (err) {
        toast.error(`Failed to fetch data! ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
        blogs,
        setBlogs,
        blog,
        setBlog,
        editBlog,
        setEditBlog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
