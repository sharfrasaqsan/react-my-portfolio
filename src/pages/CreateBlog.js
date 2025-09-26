import { toast } from "react-toastify";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useCallback, useState } from "react";

const CreateBlog = () => {
  const { blog, setBlog, setBlogs, loading } = useData();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setBlog((prev) => ({ ...prev, [name]: value }));
    },
    [setBlog]
  );

  const cancelCreate = useCallback(() => {
    navigate("/blogs");
    toast.warning("Blog creation canceled!");
    setBlog({ title: "", content: "" }); // ← fix: reset the single blog draft
  }, [navigate, setBlog]);

  const handleCreateBlog = useCallback(
    async (e) => {
      e.preventDefault();
      if (!blog.title || !blog.content) {
        toast.error("All fields are required!");
        return;
      }
      if (uploading) return;

      setUploading(true);
      try {
        const newBlog = {
          ...blog,
          createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };
        const res = await addDoc(collection(db, "blogs"), newBlog);
        setBlogs((prev) => [...prev, { id: res.id, ...newBlog }]);
        setBlog({ title: "", content: "" });
        toast.success("Blog created successfully!");
        navigate("/blogs");
      } catch (err) {
        toast.error("Failed to create blog! " + err.message);
      } finally {
        setUploading(false);
      }
    },
    [blog, navigate, setBlog, setBlogs, uploading]
  );

  if (loading) return <Loading />;
  if (!blog)
    return <p className="text-center text-body-secondary">Blog not found</p>;

  return (
    <section className="container-xxl py-5">
      <div className="card glass p-4 p-md-5">
        <h2 className="h4 mb-4">Create Blog</h2>
        <form className="row g-3" onSubmit={handleCreateBlog}>
          <div className="col-12">
            <label htmlFor="title" className="form-label">
              Blog Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              required
              autoFocus
              autoComplete="off"
              value={blog.title}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              rows="15"
              required
              value={blog.content}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-12 d-flex gap-2">
            <button
              className="btn btn-primary btn-glass"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Creating..." : "Create Blog"}
            </button>
            <button
              className="btn btn-outline-light btn-glass"
              type="button"
              onClick={cancelCreate}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
