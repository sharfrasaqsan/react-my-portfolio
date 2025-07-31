import { Link } from "react-router-dom";
import "../styles/BlogCard.css";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="blog-card-link">
      <div className="blog-card">
        <h3>{blog.title}</h3>
        <p>{blog.content ? blog.content.substring(0, 100) + "..." : ""}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
