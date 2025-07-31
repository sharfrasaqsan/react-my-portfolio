import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/BlogDetails.css";
import { useState } from "react";

const BlogDetails = () => {
  const { blogs, loading, setBlogs } = useData();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  if (loading) return <Loading />;

  if (blogs.length === 0) {
    return <p className="no-blogs-found">No Blogs to show!</p>;
  }

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) return <p className="no-blogs-found">Blog not found!</p>;

  const handleDeleteBlog = async (blogId) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "blogs", blogId));
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      toast.success("Blog deleted successfully!");
      navigate("/blogs");
    } catch (err) {
      toast.error("Failed to delete blog! " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="blog-container">
      <Link to="/blogs" className="back-link">
        <FaArrowLeftLong /> Back to Blogs
      </Link>

      <h3>{blog.title}</h3>

      <article>
        <time>Created at: {blog.createdAt}</time>
        {blog.updatedAt && <time>Updated at: {blog.updatedAt}</time>}

        <div className="blog-content">
          {blog.content.split("\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </article>

      {user && (
        <div className="blog-links">
          <Link
            to={`/admin/blog/edit/${blog.id}`}
            className="action-btn edit-btn"
          >
            Edit
          </Link>
          <button
            className="action-btn delete-btn"
            onClick={() => handleDeleteBlog(blog.id)}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
