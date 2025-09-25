import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
    <section className="container-xxl py-5">
      <div className="card glass p-4 p-md-5">
        <h2 className="h4 mb-4">Edit Blog</h2>
        <form
          className="row g-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditBlog(id);
          }}
        >
          <div className="col-12">
            <label htmlFor="title" className="form-label">
              Blog Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              value={editBlog.title}
              onChange={handleOnChange}
              required
              autoFocus
            />
          </div>
          <div className="col-12">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="15"
              className="form-control"
              value={editBlog.content}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="col-12 d-flex gap-2">
            <button
              className="btn btn-primary btn-glass"
              type="submit"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Blog"}
            </button>
            <button
              className="btn btn-outline-light btn-glass"
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBlog;
