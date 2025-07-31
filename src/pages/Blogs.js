import { useData } from "../context/DataContext";
import BlogCard from "../components/BlogCard";
import Loading from "../utils/Loading";
import "../styles/Blogs.css";

const Blogs = () => {
  const { blogs, loading } = useData();

  if (loading) return <Loading />;

  if (blogs.length === 0)
    return <p className="no-blogs-found">No blogs found!</p>;

  return (
    <section className="blogs-section">
      <h2>Blogs</h2>
      <div className="blogs-container">
        {blogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
