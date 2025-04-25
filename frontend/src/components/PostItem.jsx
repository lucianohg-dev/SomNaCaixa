import React from "react";

const PostItem = ({ post, banda }) => {
  const fileUrl = `http://localhost:5000${post.file_url}?t=${Date.now()}`;
  const bandaFotoUrl = banda?.profile_picture ? `http://localhost:5000/${banda.profile_picture}?t=${Date.now()}` : null;

  // Função para gerar título baseado no tipo de mídia
  const gerarTitulo = () => {
    if (post.file_type?.startsWith("image")) return `Post de foto ${banda?.nome}`;
    if (post.file_type?.startsWith("video")) return `Post de vídeo ${banda?.nome}`;
    if (post.file_type?.startsWith("audio")) return `Post de áudio ${banda?.nome}`;
    return `Postagem de ${banda?.nome}`;
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        backgroundColor:"rgb(255, 255, 255)",
        borderRadius: "29px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        margin: "20px auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative", // Controle do posicionamento do player
      }}
    >
      {/* Cabeçalho */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {banda?.profile_picture ? (
          <img
            src={`http://localhost:5000/${banda.profile_picture}?t=${Date.now()}`}
            alt="Foto da banda"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />
        ) : (
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              color: "#555",
              border: "2px solid #ddd",
            }}
          >
            ?
          </div>
        )}
        <strong style={{ fontSize: "1.1rem", color: "#333" }}>
          {banda?.nome}
        </strong>
      </div>

      {/* Título automático */}
      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#222" }}>
        {gerarTitulo()}
      </h3>

      {/* Legenda */}
      <p style={{ fontSize: "1rem", color: "#444", lineHeight: "1.5" }}>
        {post.caption}
      </p>

      {/* Mídia */}
      {post.file_type?.startsWith("image") && (
        <img
          src={fileUrl}
          alt="Postagem"
          style={{
            width: "100%",
            aspectRatio: "4 / 3",
            objectFit: "cover",
            borderRadius: "12px",
            backgroundColor: "#f0f0f0",
          }}
        />
      )}

      {post.file_type?.startsWith("video") && (
        <video
          controls
          style={{
            width: "100%",
            borderRadius: "12px",
            outline: "none",
          }}
        >
          <source src={fileUrl} type={post.file_type} />
        </video>
      )}

      {/* Player de Áudio no Rodapé com Foto de Fundo */}
      {post.file_type?.startsWith("audio") && (
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 3",
            objectFit: "cover",
            borderRadius: "12px",
            marginTop:"-35px", 
            backgroundImage: bandaFotoUrl ? `url(${bandaFotoUrl})` : 'none', // Foto de fundo
            backgroundSize: "cover", // A imagem vai cobrir o espaço
            backgroundPosition: "center", // Centraliza a imagem
            padding: "10px", // Adiciona um pouco de padding para o player
            boxSizing: "border-box", // Garante que o padding não quebre o layout
          }}

        >
        <div style={{ borderRadius: "30px",position:"absolute",marginTop:"204px",marginLeft:"-30px", width: "100%",height:"60px",alignItems:"center"}}>
           <audio controls style={{width: "100%" }}>
            <source src={fileUrl} type={post.file_type} />
          </audio>
        </div>
         
        </div>
        
      )}
    </div>
  );
};

export default PostItem;
