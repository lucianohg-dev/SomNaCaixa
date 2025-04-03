import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home"; // Página Home
import DashboardUser from "../pages/DashboardUser"; // Certifique-se de ter o componente Dashboard
import DashboardBand from "../pages/DashboardBand"; // Certifique-se de ter o componente Dashboard

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal de cadastro-user
  const [isModalBandOpen, setIsModalBandOpen] = useState(false); // Controle do modal de cadastro-banda
  const [isModalLogOpen, setIsModalLogOpen] = useState(false); // Controle do modal de login
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controle de autenticação do usuário

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Verifica se o token está armazenado no localStorage
    if (token) {
      setIsAuthenticated(true); // Se o token existir, o usuário está autenticado
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => {
      if (!prev) {
        setIsModalLogOpen(false);
        setIsModalBandOpen(false);
      }
      return !prev;
    });
  };

  const toggleModalBand = () => {
    setIsModalBandOpen((prev) => {
      if (!prev) {
        setIsModalOpen(false);
        setIsModalLogOpen(false);
      }
      return !prev;
    });
  };

  const toggleModalLog = () => {
    setIsModalLogOpen((prev) => {
      if (!prev) {
        setIsModalOpen(false);
        setIsModalBandOpen(false);
      }
      return !prev;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalLogOpen(false);
    setIsModalBandOpen(false);
  };

  return (
    <Router>
      <Routes>
        {/* Redirecionar "/" para "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Página Inicial */}
        <Route
          path="/home"
          element={
            <Home
              toggleModal={toggleModal}
              toggleModalBand={toggleModalBand}
              toggleModalLog={toggleModalLog}
              isModalBandOpen={isModalBandOpen}
              isModalOpen={isModalOpen}
              isModalLogOpen={isModalLogOpen}
              closeModal={closeModal}
            />
          }
        />

        {/* Rota do Dashboard, acessível apenas se o usuário estiver autenticado */}
        <Route
          path="/dashboardUser"
          element={
            isAuthenticated ? (
              <DashboardUser /> // Renderiza o DashboardUser se o usuário estiver autenticado
            ) : (
              <Navigate to="/home" /> // Redireciona para a página de login se não estiver autenticado
            )
          }
        />

        {/* Rota do Dashboard, acessível apenas se a banda estiver autenticada */}
        <Route
          path="/dashboardBand"
          element={
            isAuthenticated ? (
              <DashboardBand /> // Renderiza o DashboardBand se a banda estiver autenticada
            ) : (
              <Navigate to="/home" /> // Redireciona para a página de login se não estiver autenticado
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
