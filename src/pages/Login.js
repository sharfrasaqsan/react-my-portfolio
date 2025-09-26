// Login.js
import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = useCallback(() => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;
      if (!validateForm()) return;

      setLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const res = await getDoc(doc(db, "admin", user.uid));
        if (!res.exists()) {
          toast.error("User not found");
        } else {
          setUser(res.data());
          setEmail("");
          setPassword("");
          setFormErrors({});
          toast.success("Login successful");
          navigate("/admin");
        }
      } catch (err) {
        toast.error("Login failed: " + err.message);
      } finally {
        setLoading(false);
      }
    },
    [email, password, loading, navigate, setUser, validateForm]
  );

  return (
    <section className="container-xxl py-5">
      <div
        className="card glass p-4 p-md-5 mx-auto"
        style={{ maxWidth: "480px" }}
      >
        <h2 className="h4 mb-4 text-center">Admin Login</h2>
        <form className="row g-3" onSubmit={handleLogin} noValidate>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <div className="invalid-feedback">{formErrors.email}</div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={`form-control ${
                formErrors.password ? "is-invalid" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <div className="invalid-feedback">{formErrors.password}</div>
            )}
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary btn-glass w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
