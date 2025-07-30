import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      const res = await getDoc(doc(db, "admin", user.uid));
      if (!res.exists()) {
        toast.error("User not found");
        return;
      }

      setUser(res.data());
      setEmail("");
      setPassword("");
      setFormErrors({});
      toast.success("Login successful");
      navigate("/admin");
    } catch (err) {
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-container">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={formErrors.email ? "input-error" : ""}
        />
        {formErrors.email && (
          <span className="error-message">{formErrors.email}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={formErrors.password ? "input-error" : ""}
        />
        {formErrors.password && (
          <span className="error-message">{formErrors.password}</span>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;
