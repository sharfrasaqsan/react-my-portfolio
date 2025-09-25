import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container-xxl py-5 text-center">
      <div className="card glass p-5 mx-auto" style={{ maxWidth: "480px" }}>
        <h3 className="display-4 fw-bold text-danger">404</h3>
        <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary btn-glass">
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
