import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import GlobalStyle from "../assets/styles/GlobalStyle"; // corrigido caminho

import {
  NavTop,
  SomNaCaixaTitle,
  DashboardContainer,
  Title,
  LogoutButton,
  ProfileImageContainer,
  ProfileImage,
  NoProfileImage,
  FileInputLabel,
  FileInput,
  InfoMessage,
  SuccessMessage,
  AlertMessage,
  PostForm,
  PostInput,
  SubmitButton,
  UploadButton,
} from '../assets/styles/dashboardStyles';

const DashboardBand = () => {
  const [bandData, setBandData] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [postData, setPostData] = useState({ caption: '', file: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('http://localhost:5000/api/dashboardBand', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBandData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados da banda:', error);
      }
    };

    fetchData();
  }, []);

  const handlePostChange = (event) => {
    const { name, type, files, value } = event.target;
    setPostData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!postData.file) {
      alert("Selecione um arquivo para postar.");
      return;
    }

    const formData = new FormData();
    formData.append('post_file', postData.file);
    formData.append('caption', postData.caption);

    try {
      const token = localStorage.getItem('authToken');
      const response = await api.post('http://localhost:5000/api/uploads-band-post', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload bem-sucedido!', response.data);
      alert('Arquivo enviado com sucesso!');
      setPostData({ caption: '', file: null }); // limpa o form após envio
    } catch (error) {
      console.error('Erro ao enviar a postagem:', error);
      alert('Erro ao enviar o arquivo.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/home');
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) {
      setInfoMessage('Selecione uma foto primeiro.');
      setTimeout(() => setInfoMessage(''), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('profile_picture', photoFile);

    try {
      const token = localStorage.getItem('authToken');
      await api.put('http://localhost:5000/api/uploads-profile-pictureBand', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Foto alterada com sucesso!');
      setTimeout(() => setMessage(''), 3000);

      // Atualiza os dados
      const response = await api.get('http://localhost:5000/api/dashboardBand', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBandData(response.data);
    } catch (error) {
      console.error('Erro ao enviar a foto:', error);
      setMessage('Erro ao enviar a foto.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!bandData) return <p>Carregando...</p>;

  return (
    <>
      <GlobalStyle />
      <NavTop>
        <SomNaCaixaTitle>SomNaCaixa</SomNaCaixaTitle>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavTop>

      <DashboardContainer>
        <ProfileImageContainer>
          {bandData.profile_picture ? (
            <ProfileImage
              src={`http://localhost:5000/${bandData.profile_picture}?t=${Date.now()}`}
              alt="Foto da banda"
            />
          ) : (
            <NoProfileImage>Sem Foto</NoProfileImage>
          )}

          <FileInputLabel>
            <FileInput type="file" onChange={(e) => setPhotoFile(e.target.files[0])} />
            Escolher Nova Foto
          </FileInputLabel>

          <UploadButton onClick={handlePhotoUpload}>Salvar Nova Foto</UploadButton>
        </ProfileImageContainer>

        <Title>{bandData.nome}</Title>

        <PostForm onSubmit={handlePostSubmit}>
          <PostInput
            type="text"
            name="caption"
            value={postData.caption}
            onChange={handlePostChange}
            placeholder="Escreva uma legenda..."
          />
          <FileInputLabel>
            <FileInput type="file" name="file" onChange={handlePostChange} />
            Escolher Arquivo
          </FileInputLabel>
          <SubmitButton type="submit">Postar</SubmitButton>
        </PostForm>

        <InfoMessage>{infoMessage}</InfoMessage>
        <SuccessMessage>{message}</SuccessMessage>
      </DashboardContainer>
    </>
  );
};

export default DashboardBand;
