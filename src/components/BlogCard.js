// BlogCard.js
import React, { memo } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="card glass h-100">
      <div className="card-body p-4">
        <h3 className="h5 mb-2">{blog.title}</h3>
        {blog.content && (
          <p className="text-body-secondary mb-0 line-clamp-2">
            {blog.content}
          </p>
        )}
        <Link
          to={`/blog/${blog.id}`}
          className="stretched-link"
          aria-label={`Open blog ${blog.title}`}
        />
      </div>
    </div>
  );
};

export default memo(BlogCard);
