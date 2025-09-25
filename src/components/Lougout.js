import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";

const Lougout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    toast.success("Logout successful");
    navigate("/");
  };

  if (!user) return null;

  return (
    <button
      type="button"
      className="btn btn-sm btn-glass d-flex align-items-center gap-2"
      onClick={handleLogout}
      aria-label="Logout"
      title="Logout"
    >
      <CiLogout aria-hidden /> Logout
    </button>
  );
};

export default Lougout;
