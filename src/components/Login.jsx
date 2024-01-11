import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal";


const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:30vh;
 
 
  
`;

const LoginButton = styled.button`
  padding: 15px 30px;
  background-color: #2c3e50;
  color: #ecf0f1;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }
`;

const AboutMeButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #ecf0f1;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [aboutMeModalOpen, setAboutMeModalOpen] = useState(false);

  const openAboutMeModal = () => {
    setAboutMeModalOpen(true);
  };

  const closeAboutMeModal = () => {
    setAboutMeModalOpen(false);
  };

  const handleLogin = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <LoginFormContainer>
        <Title> 🎲 Carlos Games Hub 🎲</Title>
        <LoginButton onClick={handleLogin}>Log In</LoginButton>
        <AboutMeButton onClick={openAboutMeModal}>About Me</AboutMeButton>
      </LoginFormContainer>

      <p style={{ textAlign: 'center', marginTop: '50px' }}>
      for this demo version, if you don't want to log in, you can click the next button to go to the home page
    </p>

<div style={{ textAlign: 'center', marginTop: '50px' }} >
      <button style={{ width: '100px', height:'75px', backgroundColor:"aquamarine" }}  onClick={()=>navigate("/home")}>Home</button>
      </div>

      <CustomModal open={aboutMeModalOpen} onClose={closeAboutMeModal}>
        <h2>About Me</h2>
        <p>This is a brief description of who I am.</p>
      </CustomModal>
    </>
  );
};

export default Login;
