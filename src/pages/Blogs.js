import { useData } from "../context/DataContext";
import BlogCard from "../components/BlogCard";
import Loading from "../utils/Loading";

const Blogs = () => {
  const { blogs, loading } = useData();

  if (loading) return <Loading />;
  if (!blogs || blogs.length === 0)
    return <p className="text-center text-body-secondary">No blogs found!</p>;

  return (
    <section className="container-xxl py-5">
      <h2 className="h3 mb-3">Blogs</h2>
      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-12 col-sm-6 col-lg-4">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
