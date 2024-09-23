import React from "react";
import { Link } from "react-router-dom";
import "./styles/Blogs.css";

const Blog = ({ posts }) => {
  return (
    <div className="blog-container">
      <h2>Blogs</h2>
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post.id} className="blog-post">
            <Link to={`/blogs/${post.id}`} className="blog-link">
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-date">{post.date}</p>
              <div
                className="blog-body"
                dangerouslySetInnerHTML={{
                  __html:
                    post.body.length > 150
                      ? post.body.slice(0, 150) + "..."
                      : post.body,
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
