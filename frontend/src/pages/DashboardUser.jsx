// IMPORTAÇÕES DE BIBLIOTECAS E COMPONENTES
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import GlobalStyle from "../assets/styles/GlobalStyle";
import PostItem from "../components/PostItem.jsx";
import {
  NavTop,
  SomNaCaixaTitle,
  SomNaCaixaLogo,
  FotoNomeProfile,
  ButtonsProfileUser,
  Title,
  LogoutButton,
  ProfileImage,
  NoProfileImage,
  FileInputLabel,
  FileInput,
  InfoMessage,
  SuccessMessage,
  AlertMessage,
  PostsContainer,
  SectionTitle,
} from "../assets/styles/DashUserStyles.js";

const Dashboard = () => {
  // ESTADOS GLOBAIS DO COMPONENTE
  const [userData, setUserData] = useState(null); // Dados do usuário logado
  const [message, setMessage] = useState(""); // Mensagem de sucesso
  const [infoMessage, setInfoMessage] = useState(""); // Mensagem de validação
  const [isUploading, setIsUploading] = useState(false); // Estado de upload da imagem
  const [alertVisible, setAlertVisible] = useState(false); // Alerta sobre regras de imagem
  const [bandaPosts, setBandaPosts] = useState([]); // Lista de postagens da banda

  const navigate = useNavigate();

  // FUNÇÃO PARA BUSCAR DADOS DO USUÁRIO/BANDA AO MONTAR O COMPONENTE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("http://localhost:5000/api/dashboardUser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Resposta da API:", response.data);
        setUserData(response.data);

        // Se for uma banda e tiver posts
        if (response.data.banda && response.data.banda.Posts) {
          console.log("Posts da banda:", response.data.banda.Posts);
          setBandaPosts(response.data.banda.Posts);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário ou posts da banda:", error);
      }
    };

    fetchData();
  }, []);

  // FUNÇÃO PARA VERIFICAR TIPO E TAMANHO DA IMAGEM E ENVIAR PARA UPLOAD
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setInfoMessage("Apenas arquivos JPG, JPEG e PNG são permitidos.");
        setTimeout(() => setInfoMessage(""), 3000);
        return;
      }

      if (file.size > maxSize) {
        setInfoMessage("O tamanho do arquivo não pode exceder 2 MB.");
        setTimeout(() => setInfoMessage(""), 3000);
        return;
      }

      setInfoMessage("Arquivo válido. Iniciando upload...");
      setTimeout(() => setInfoMessage(""), 3000);

      uploadPhoto(file);
    }
  };

  // FUNÇÃO RESPONSÁVEL PELO UPLOAD DA FOTO DE PERFIL DO USUÁRIO
  const uploadPhoto = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const token = localStorage.getItem("authToken");
      const response = await api.put(
        "http://localhost:5000/api/uploads-profile-pictureUser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Foto de perfil atualizada com sucesso!");
      setTimeout(() => setMessage(""), 3000);

      // Atualiza os dados do usuário com a nova imagem
      setUserData((prev) => ({
        ...prev,
        user: { ...prev.user, profile_picture: response.data.photoUrl },
      }));
    } catch (error) {
      console.error("Erro ao fazer o upload da foto de perfil:", error);
      setMessage("Erro ao fazer o upload da foto.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  // FUNÇÃO DE LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/home");
  };

  // MOSTRA ALERTA TEMPORÁRIO AO PASSAR O MOUSE SOBRE "CHANGE PHOTO"
  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  // LOADING CASO OS DADOS DO USUÁRIO AINDA NÃO TENHAM SIDO CARREGADOS
  if (!userData) return <p>Carregando...</p>;

  return (
    <>
      <GlobalStyle />

      {/* BARRA SUPERIOR COM LOGO, NOME E BOTÕES */}
      <NavTop>
        <SomNaCaixaLogo />
        <SomNaCaixaTitle>SomNaCaixa</SomNaCaixaTitle>

        <FotoNomeProfile>
          {userData.user.profile_picture ? (
            <ProfileImage
              src={`http://localhost:5000/${userData.user.profile_picture}?t=${Date.now()}`}
              alt="Foto de perfil do usuário"
            />
          ) : (
            <NoProfileImage>Sem Foto</NoProfileImage>
          )}

          <Title>{userData.user.nome}</Title>

          <ButtonsProfileUser>
            <FileInputLabel onMouseEnter={showAlert}>
              Change Photo
              <FileInput type="file" onChange={handleFileChange} />
            </FileInputLabel>

            <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
          </ButtonsProfileUser>

          {alertVisible && (
            <AlertMessage>
              Tipo de imagem JPG, JPEG ou PNG (máximo 2 MB)
            </AlertMessage>
          )}

          <InfoMessage $isValid={infoMessage.includes("válido")}>
            {infoMessage}
          </InfoMessage>

          <SuccessMessage>{message}</SuccessMessage>
        </FotoNomeProfile>
      </NavTop>

      {/* POSTS DA BANDA EXIBIDOS NA DASHBOARD */}
      {bandaPosts.length > 0 && (
  <div style={{ width: "100%", padding: "20px" }}>
    <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#ffffff" }}>
      Postagens de {userData.banda?.nome}
    </h2>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    }}>
      {bandaPosts.map((post) => (
        <PostItem key={post.id} post={post} banda={userData.banda} />
      ))}
    </div>
  </div>
)}

    </>
  );
};

export default Dashboard;
