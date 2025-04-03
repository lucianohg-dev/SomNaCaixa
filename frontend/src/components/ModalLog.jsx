// ModalLog.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api.js";

export default function ModalLog({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Tipo de login
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const route = userType === "user" ? "/api/loginUsers" : "/api/loginBands";
      const response = await api.post(`http://localhost:5000${route}`, { email, password }, { withCredentials: true });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate(userType === "banda" ? "/dashboardBand" : "/dashboardUser");
        handleClose();
      } else {
        setError("Erro inesperado ao realizar login. Tente novamente.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Credenciais inválidas. Verifique e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    setUserType("user");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div className="modal" style={modalStyle}>
        <div className="modal-header" style={headerStyle}>
          <h2>Login</h2>
          <button onClick={handleClose} className="close-button" style={closeButtonStyle}>&times;</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroupStyle}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <label>Senha:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <label>Tipo de Login:</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)} style={inputStyle}>
              <option value="user">Usuário</option>
              <option value="banda">Banda</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading} style={buttonStyle}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  width: "300px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const closeButtonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  padding: "8px",
  marginTop: "5px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};
