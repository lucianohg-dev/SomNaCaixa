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
  const [userData, setUserData] = useState(null);

  const [message, setMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [bandaPosts, setBandaPosts] = useState([]); // <-- Adicionado para os posts

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get(
          "http://localhost:5000/api/dashboardUser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Resposta da API:", response.data); // 👈 Adiciona isso

        setUserData(response.data);

        if (response.data.banda && response.data.banda.Posts) {
          console.log("Posts da banda:", response.data.banda.Posts);
          setBandaPosts(response.data.banda.Posts);
        }
      } catch (error) {
        console.error(
          "Erro ao buscar os dados do usuário ou posts da banda:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setInfoMessage("Apenas arquivos JPG, JPEG e PNG são permitidos.");
        setPhotoFile(null);
        setTimeout(() => setInfoMessage(""), 3000);
        return;
      }

      if (file.size > maxSize) {
        setInfoMessage("O tamanho do arquivo não pode exceder 2 MB.");
        setPhotoFile(null);
        setTimeout(() => setInfoMessage(""), 3000);
        return;
      }

      setInfoMessage("Arquivo válido. Iniciando upload...");
      setTimeout(() => setInfoMessage(""), 3000);
      setPhotoFile(file);

      uploadPhoto(file);
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/home");
  };

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  if (!userData) return <p>Carregando...</p>;

  return (
    <>
      <GlobalStyle />

      {/* TOPO COM LOGO E USUÁRIO */}
      <NavTop>
        <SomNaCaixaLogo />

        <SomNaCaixaTitle>SomNaCaixa</SomNaCaixaTitle>

        <FotoNomeProfile>
          {userData.user.profile_picture ? (
            <ProfileImage
              src={`http://localhost:5000/${
                userData.user.profile_picture
              }?t=${Date.now()}`}
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

      {/*CODIGO TRAZ INFORMAÇÕES DA BANDA ABAIXO DO </navTop>
      {userData.banda && (
        <DashboardContainer>
          <ProfileImageContainer>
            {userData.banda.profile_picture ? (
              <ProfileImageBanda
                src={`http://localhost:5000/${userData.banda.profile_picture}?t=${Date.now()}`}
                alt="Foto da banda"
              />
            ) : (
              <NoProfileImage>Sem Foto</NoProfileImage>
            )}
          </ProfileImageContainer>
  
          <TitleBanda>{userData.banda.nome}</TitleBanda>
        </DashboardContainer>
      )} */}


      {/* POSTS DA BANDA */}
      {bandaPosts.length > 0 && (
  <PostsContainer>
    <SectionTitle>Postagens da Banda</SectionTitle>
    {bandaPosts.map((post) => (
      <PostItem key={post.id} post={post} banda={userData.banda} />
    ))}
  </PostsContainer>
)}

    </>
  );
};

export default Dashboard;
