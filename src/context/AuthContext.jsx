import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signIn, signUp, signOut } from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCurrentUser().then((u) => {
      if (!active) return;
      setUser(u);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const login = async (email, password) => {
    await signIn(email, password);
    const u = await getCurrentUser();
    setUser(u);
  };

  const register = async (email, password, name) => {
    await signUp(email, password, name);
    const u = await getCurrentUser();
    setUser(u);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}