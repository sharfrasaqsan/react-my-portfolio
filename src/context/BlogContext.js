import { createContext, useContext } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children, value }) => {
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogs = () => useContext(BlogContext);
