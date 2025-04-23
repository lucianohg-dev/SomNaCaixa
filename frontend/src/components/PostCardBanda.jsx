// components/PostCardBanda.jsx
import React from "react";

const PostCardBanda = ({ post, banda }) => {
  return (
    <div style={{
      maxWidth: "600px",
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      margin: "20px auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}>
      {/* Cabeçalho com imagem e nome da banda */}
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

      {/* Legenda */}
      <p style={{ fontSize: "1rem", color: "#444", lineHeight: "1.5" }}>
        {post.caption}
      </p>

      {/* Mídia */}
      {post.file_type?.startsWith("image") && (
        <img
          src={`http://localhost:5000${post.file_url}?t=${Date.now()}`}
          alt="Postagem"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      )}
      {post.file_type?.startsWith("video") && (
        <video controls style={{ width: "100%", borderRadius: "12px" }}>
          <source
            src={`http://localhost:5000${post.file_url}?t=${Date.now()}`}
            type={post.file_type}
          />
        </video>
      )}
      {post.file_type?.startsWith("audio") && (
        <audio controls style={{ width: "100%" }}>
          <source
            src={`http://localhost:5000${post.file_url}?t=${Date.now()}`}
            type={post.file_type}
          />
        </audio>
      )}
    </div>
  );
};

export default PostCardBanda;
