import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useMemo, useState, useCallback } from "react";

const BlogDetails = () => {
  const { blogs, loading, setBlogs } = useData();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const blog = useMemo(() => blogs.find((b) => b.id === id), [blogs, id]);

  const paragraphs = useMemo(
    () => (blog.content || "").split("\n"),
    [blog.content]
  );

  const handleDeleteBlog = useCallback(
    async (blogId) => {
      if (deletingId) return;
      setDeletingId(blogId);
      try {
        await deleteDoc(doc(db, "blogs", blogId));
        setBlogs((prev) => prev.filter((b) => b.id !== blogId));
        toast.success("Blog deleted successfully!");
        navigate("/blogs");
      } catch (err) {
        toast.error("Failed to delete blog! " + err.message);
      } finally {
        setDeletingId(null);
      }
    },
    [deletingId, navigate, setBlogs]
  );

  if (loading) return <Loading />;
  if (blogs.length === 0)
    return <p className="text-center text-body-secondary">No Blogs to show!</p>;
  if (!blog)
    return <p className="text-center text-body-secondary">Blog not found!</p>;

  return (
    <section className="container-xxl py-5">
      <Link to="/blogs" className="btn btn-link text-decoration-none mb-3">
        <FaArrowLeftLong /> Back to Blogs
      </Link>

      <div className="card glass p-4">
        <h3 className="h4">{blog.title}</h3>
        <p className="small text-body-secondary">
          Created at: {blog.createdAt}
          {blog.updatedAt && <> • Updated at: {blog.updatedAt}</>}
        </p>

        <div className="mb-4">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {user && (
          <div className="d-flex gap-2">
            <Link
              to={`/admin/blog/edit/${blog.id}`}
              className="btn btn-sm btn-secondary"
            >
              Edit
            </Link>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteBlog(blog.id)}
              disabled={deletingId === blog.id}
            >
              {deletingId === blog.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetails;
