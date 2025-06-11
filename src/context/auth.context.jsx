import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

//Create Auth Context
const AuthContext = createContext();

//Create wrapper for Auth Context
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //TODO: Make sure UI uses Loading
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const login = async (credentials) => {
    //Credentials = email+password
    try {
      setIsLoading(true);
      const response = await api.post("/api/auth/login", credentials);
      const { authToken } = response.data;
      if (authToken) {
        storeToken(authToken);
        // Fetch user info using the token (separate call )
        const userRes = await api.get("/api/auth/me");
        setUser(userRes.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const signup = async (info) => {
    //info = signup form data
    try {
      setIsLoading(true);
      const response = await api.post("/api/auth/signup", info);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoading(false);
      //TODO:Added these two, see if they cause issues:
      setUser(null), setIsLoggedIn(false);
      return;
    }
    try {
      const response = await api.get("/api/auth/verify");
      if (response.status === 200) {
        const userRes = await api.get("/api/auth/me");
        setUser(userRes.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.warn("Token invalid or expired:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, login, signup, logout, storeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}

export { useAuthContext, AuthContext, AuthProvider };
