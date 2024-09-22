import React from "react";
import Blogs from "../components/Blogs";

const BlogsPage = ({ posts }) => {
  return (
    <section>
      <Blogs posts={posts} />
    </section>
  );
};

export default BlogsPage;
