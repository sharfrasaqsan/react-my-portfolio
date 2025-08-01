import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";
import "../styles/Logout.css";

const Lougout = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <>
      {user ? (
        <li onClick={handleLogout} className="logout-button">
          <CiLogout /> Logout
        </li>
      ) : null}
    </>
  );
};

export default Lougout;
