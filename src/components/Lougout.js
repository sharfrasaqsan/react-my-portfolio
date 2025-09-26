// Lougout.js
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";

const Lougout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  const handleLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await signOut(auth);
      if (mounted.current) {
        setUser(null);
        toast.success("Logout successful");
        navigate("/");
      }
    } catch (e) {
      toast.error("Failed to logout. Please try again.");
    } finally {
      mounted.current && setBusy(false);
    }
  };

  if (!user) return null;

  return (
    <button
      type="button"
      className="btn btn-sm btn-glass d-flex align-items-center gap-2"
      onClick={handleLogout}
      aria-label="Logout"
      title="Logout"
      disabled={busy}
    >
      <CiLogout aria-hidden /> {busy ? "Logging out..." : "Logout"}
    </button>
  );
};

export default Lougout;
