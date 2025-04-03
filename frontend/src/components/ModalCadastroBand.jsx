import React, { useState } from "react";
import api from "../service/api";
import styled from "styled-components";

export default function ModalBand({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    genero: "",
    descricao: "",
    membros: "",
    redesSociais: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmarPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("http://localhost:5000/api/bandas", {
        nome: formData.nome,
        genero:formData.genero,
        descricao:formData.descricao,
        membros:formData.membros,
        redesSociais:formData.redesSociais,
        email:formData.email,
        password:formData.password,
      
      });

      setMessage("Banda cadastrada com sucesso!");
      setFormData({
        nome: "",
        genero: "",
        descricao: "",
        membros: "",
        redesSociais: "",
        email: "",
        password: "",
        confirmarPassword: "",
      });

      setTimeout(() => {
        if (onClose) onClose();
      }, 2000); // Fecha o modal após 2s
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar a banda.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <h2>Cadastro de Banda</h2>
          <CloseButton onClick={onClose} aria-label="Fechar modal">
            &times;
          </CloseButton>
        </Header>
        <Form onSubmit={handleSubmit}>
          {[
            { label: "Nome da Banda", name: "nome", type: "text", required: true },
            { label: "Gênero Musical", name: "genero", type: "text", required: true },
            { label: "Descrição", name: "descricao", type: "textarea", required: true },
            { label: "Membros (Nomes e Funções)", name: "membros", type: "textarea" },
            { label: "Redes Sociais (URLs)", name: "redesSociais", type: "text" },
            { label: "E-mail", name: "email", type: "email", required: true },
            { label: "Senha", name: "password", type: "password", required: true },
            { label: "Confirmar Senha", name: "confirmarPassword", type: "password", required: true },
          ].map(({ label, name, type, required }) => (
            <Label key={name}>
              {label}:
              {type === "textarea" ? (
                <Textarea name={name} value={formData[name]} onChange={handleInputChange} required={required} />
              ) : (
                <Input type={type} name={name} value={formData[name]} onChange={handleInputChange} required={required} />
              )}
            </Label>
          ))}

          {message && <SuccessMessage>{message}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </SubmitButton>
        </Form>
      </ModalContainer>
    </Overlay>
  );
}

// Estilos com Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: green;
`;

const ErrorMessage = styled.p`
  color: red;
`;

