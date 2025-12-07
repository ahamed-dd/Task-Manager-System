import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userName, loginUser, logOut } from "../api/loginapi";

// If you have a real user type, define it here instead of `any`.
type AuthUser = any;

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const location = useLocation();

  const getAuthenticatedUser = async () => {
    try {
      const u = await userName();
      setUser(u);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      nav("/home");
    }
  };

  const login = async (username: string, password: string) => {
    const u = await loginUser(username, password);
    if (u) {
      setUser(u);
      nav("/tasks");
    } else {
      alert("Incorrect username or password");
    }
  };

  useEffect(() => {
    const protectedRoutes = ["/tasks"];
    if (protectedRoutes.includes(location.pathname)) {
      void getAuthenticatedUser();
    }
  }, [location.pathname]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
