import React from "react";
import { NavLink } from "react-router-dom";
import tictactoeImage from "../assets/tictactoe.gif";
import hangmanImage from "../assets/hangman.gif";
import sudokuImage from "../assets/sudoku.gif";

const Home = () => {
  return (
    <>
      <NavLink to="/tictactoe">
        <img src={tictactoeImage} alt="TicTacToe" />
      </NavLink>

      <NavLink to="/hangman">
        <img src={hangmanImage} alt="HangmanGame" />
      </NavLink>

      <NavLink to="/sudoku">
        <img src={sudokuImage} alt="SudokuGame" />
      </NavLink>
    </>
  );
};

export default Home;
