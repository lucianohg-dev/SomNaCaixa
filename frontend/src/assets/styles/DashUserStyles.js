import styled from 'styled-components';

export const NavTop = styled.div`
  width: 100%;
  height: 85px;
  background-color: rgb(59, 59, 59);
  box-shadow: 0 2px 4px rgba(36, 24, 24, 0.1);
  `

export const FotoNomeProfile = styled.div`
  position:absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const SomNaCaixaTitle = styled.h1`

  font-family: "Cinzel", serif;
  font-size: 40px;
  color: white;

  text-align: center;
`;


export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

`;

export const ProfileImage = styled.img`

  width: 67px;
  height: 67px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #333;
  box-shadow: 0px 4px 8px rgb(134, 134, 134);
 
`;

export const NoProfileImage = styled.div`

  display: flex;
  align-items: center;
  gap: 10px;

`;

export const ButtonsProfileUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
` 

export const FileInputLabel = styled.label`
 padding: 6px 10px;
  font-size: 0.8rem;
  background-color:white;
   color:black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
    &:hover {
   background-color: rgb(99, 99, 99);
   color:white;
  }
`;

export const LogoutButton = styled.button`
 padding: 7px 10px;
  font-size: 0.8rem;
  background-color: rgb(99, 99, 99);
   color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
    &:hover {
   background-color:white;
   color:black;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const PostInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background-color: rgb(192, 69, 20);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: red;
  }
`;

export const UploadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const InfoMessage = styled.p`
  color: ${(props) => (props.$isValid ? "green" : "red")};
  font-size: 14px;
  margin-top: 10px;
`;

export const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  text-align: center;
`;

export const AlertMessage = styled.p`
position: absolute;
margin-top: 50px;
right:10px;
  color:white;
  font-size: 11px;
  text-align: center;
  font-weight: bold;
`;


export const ProfileImageBanda = styled.img`
  width: 150px;
  height: 150px;
  margin-left: 600px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #333;
  box-shadow: 0px 4px 8px rgb(192, 69, 20);
`;
export const SomNaCaixaLogo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 20px;
`;
export const Title = styled.h1`
  font-family: "Yellowtail", cursive;
  font-weight: 450;
  font-style: normal;

 font-size: 2.1rem;
  color:rgb(255, 255, 255);

  margin-right: 10px;
`;
export const TitleBanda = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

export const PostsContainer = styled.div`
  background-color: #f9f9f9;
  padding: 30px;
  margin: 40px auto;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const PostCard = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  img, video {
    width: 100%;
    max-width: 100%;
    border-radius: 8px;
    margin-top: 10px;
  }

  audio {
    width: 100%;
    margin-top: 10px;
  }

  p {
    font-weight: 500;
    margin-bottom: 10px;
    color: #333;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #222;
  text-align: center;
`;