import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found-box">
        <h3>404</h3>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-button">
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
