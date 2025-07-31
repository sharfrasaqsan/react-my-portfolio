import { toast } from "react-toastify";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useState } from "react";
import "../styles/CreateBlog.css";

const CreateBlog = () => {
  const { blog, setBlog, blogs, setBlogs, loading } = useData();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (!blog) return <p className="no-blogs-found">Blog not found</p>;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cancelCreate = () => {
    navigate("/blogs");
    toast.warning("Blog creation canceled!");
    setBlogs({
      title: "",
      content: "",
    });
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.content) {
      toast.error("All fields are required!");
      return;
    }

    setUploading(true);
    try {
      const newBlog = {
        ...blog,
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      const res = await addDoc(collection(db, "blogs"), newBlog);

      setBlogs([...blogs, { id: res.id, ...newBlog }]);

      setBlog({
        title: "",
        content: "",
      });

      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (err) {
      toast.error("Failed to create blog! " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="create-blog-section">
      <div className="create-blog-container">
        <h2>Create Blog</h2>
        <form onSubmit={handleCreateBlog}>
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            autoFocus
            autoComplete="off"
            value={blog.title}
            onChange={handleOnChange}
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            required
            autoComplete="off"
            rows="30"
            value={blog.content}
            onChange={handleOnChange}
          />

          <button type="submit" disabled={uploading}>
            {uploading ? "Creating..." : "Create Blog"}
          </button>

          <button type="button" onClick={() => cancelCreate()}>
            Cencel
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
