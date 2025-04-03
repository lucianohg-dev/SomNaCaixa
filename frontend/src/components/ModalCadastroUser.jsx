import React, { useState } from "react";
import api from '../service/api';


export default function ModalCad({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      setIsLoading(true); // Começa o carregamento
      try {
        await api.post("http://localhost:5000/api/usuarios", {
          nome: formData.nome,
          email: formData.email,
          password: formData.password,
        });
    
        setMessage("Cadastro realizado com sucesso!");
        setError("");
        onClose(); // Fecha o modal após cadastro bem-sucedido
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Erro ao cadastrar usuário"
        );
        setMessage("");
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    } else {
      setError("As senhas não são iguais.");
      setMessage("");
    }
  };

  if (!isOpen) return null; // Retorna null se o modal não estiver aberto

  return (
    <div style={styles.overlay}>
    <div
      className="modal"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Cadastrar usuário</h1>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          required
          value={formData.nome}
          onChange={handleFormChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleFormChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          value={formData.password}
          onChange={handleFormChange}
        />
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirma Senha"
          required
          value={formData.confirmPassword}
          onChange={handleFormChange}
        />
        <br />
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Cadastrar"}
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
}