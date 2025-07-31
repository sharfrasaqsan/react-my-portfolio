import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/EditBlog.css";

const EditBlog = () => {
  const { blogs, setBlogs, editBlog, setEditBlog, loading } = useData();
  const [updating, setUpdating] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id === id);

  useEffect(() => {
    if (blog) {
      setEditBlog({ ...blog });
    }
  }, [blog, setEditBlog]);

  if (loading) return <Loading />;

  if (!editBlog) return <p className="no-blogs-found">Blog not found!</p>;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setEditBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cancelEdit = () => {
    navigate(`/blog/${id}`);
    toast.warning("Blog update canceled!");
    setEditBlog({
      title: "",
      content: "",
    });
  };

  const handleEditBlog = async (blogId) => {
    setUpdating(true);
    try {
      const updatedBlog = {
        ...editBlog,
        updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      await updateDoc(doc(db, "blogs", blogId), updatedBlog);

      setBlogs(
        blogs.map((blog) =>
          blog.id === blogId ? { ...blog, ...updatedBlog } : blog
        )
      );
      toast.success("Blog updated successfully!");
      navigate(`/blog/${blogId}`);
      setEditBlog({
        title: "",
        content: "",
      });
    } catch (err) {
      toast.error("Failed to update blog! " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className="create-blog-section">
      <div className="create-blog-container">
        <h2>Edit Blog</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditBlog(id);
          }}
        >
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            autoFocus
            autoComplete="off"
            value={editBlog.title}
            onChange={handleOnChange}
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            required
            autoComplete="off"
            rows="30"
            value={editBlog.content}
            onChange={handleOnChange}
          />

          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update Blog"}
          </button>

          <button type="button" onClick={() => cancelEdit()}>
            Cencel
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditBlog;
