// src/components/PrivateRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isChecking) return <p>Carregando...</p>;

  return isAuthenticated ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
