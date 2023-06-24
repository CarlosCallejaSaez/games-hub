import React,{useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import tictactoeImage from "../assets/tictactoe.gif";
import hangmanImage from "../assets/hangman.gif";
import sudokuImage from "../assets/sudoku.gif";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Header = styled.div`
  align-self: center;
  margin-top: 20px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin-top: 20px;
  }
`;

const LinkImage = styled.img`
  width: 200px;
  margin: 0 10px;

  @media (max-width: 768px) {
    width: 150px;
    margin: 10px;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Home = () => {




  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("user", "");
    navigate("/");
  };

  return (
    <Container>
      <HomeContainer>
        <Header>
          <h1>Welcome Player!!</h1>
        </Header>

        <LogoutButton onClick={handleLogout}>Log out</LogoutButton>

        <LinksContainer>
          <NavLink to="/tictactoe">
            <LinkImage src={tictactoeImage} alt="TicTacToe" />
          </NavLink>

          <NavLink to="/hangman">
            <LinkImage src={hangmanImage} alt="HangmanGame" />
          </NavLink>

          <NavLink to="/sudoku">
            <LinkImage src={sudokuImage} alt="SudokuGame" />
          </NavLink>
        </LinksContainer>
      </HomeContainer>
    </Container>
  );
};

export default Home;
