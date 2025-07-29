import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          const fetchCurrentUser = await getDoc(doc(db, "admin", user.uid));
          if (fetchCurrentUser.exists()) {
            setUser({ id: user.uid, ...fetchCurrentUser.data() });
          } else {
            setUser(null);
            toast.error("User not found");
          }
        } catch (err) {
          setUser(null);
          toast.error("User not found", err.message);
        } finally {
          setLoading(false);
        }
      }
    });

    unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
