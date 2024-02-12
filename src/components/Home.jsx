import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import tictactoeImage from "../assets/tictactoe.webp";
import hangmanImage from "../assets/hangman.gif";
import sudokuImage from "../assets/sudoku.gif";
import styled from "styled-components";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";



const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url(./cyberpunk.gif); 
  background-size: cover; 
  background-position: center; 
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



const Home = () => {




  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Container>
      <HomeContainer>
        <Header>
        {user && (<>
        <h1>Welcome {user.name}</h1>
          <p>{user.email}</p>.
          </>)}
          

        </Header>

       <LogoutButton />
     
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
