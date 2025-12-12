import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // datos del usuario (nombre, email, rol)
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // cargar token/usuario desde localStorage al iniciar
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const u = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const saveAuth = (tokenValue, userObj) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(tokenValue);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, saveAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);