import React from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";
import "./styles/BlogPost.css";

const BlogPost = () => {
  const { id } = useParams();
  const posts = useBlogs();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="blog-post-container">
      <h1 className="blog-post-title">{post.title}</h1>
      <p className="blog-post-date">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  );
};

export default BlogPost;
