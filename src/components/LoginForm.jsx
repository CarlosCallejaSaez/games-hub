import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import CustomModal from "./CustomModal";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const AboutMeButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, rgba(199,141,160,0.8100490196078431) 33%, rgba(148,218,233,1) 100%);
  }
`;

const PageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled.h6`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "carlos" && password === "rockthecode") {
      const user = {
        username: "carlos",
        name: "Carlos",
      };
      try {
        sessionStorage.setItem("user", JSON.stringify(user));
        setLoggedIn(true);
      } catch (err) { console.log(err); }
    } else {
      alert("Invalid username or password");
    }
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <PageContainer>
      <ButtonContainer>
        <AboutMeButton onClick={openModal}>About Me!</AboutMeButton>
      </ButtonContainer>
      <CustomModal open={modalOpen} onClose={closeModal} />
      <br />
      <LoginFormContainer>
        <Title>🎮Games Hub🎲</Title>
        <Subtitle> © Carlos Calleja Sáez</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">User:</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Log In</Button>
        </Form>
      </LoginFormContainer>
    </PageContainer>
  );
};

export default LoginForm;
