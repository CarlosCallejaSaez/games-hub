import React from "react";
import Home from "./components/Home";
import { Routes, Route,Navigate } from "react-router-dom";
import TicTacToe from "./components/TicTacToe";
import HangmanGame from "./components/HangmanGame";
import SudokuGame from "./components/SudokuGame";
import LoginForm from "./components/LoginForm";

const App = () => {
  const isLoggedIn = localStorage.getItem("user");
  return (
    <>
    
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/tictactoe" element={<TicTacToe/>} />
        <Route path="/hangman" element={<HangmanGame/>} />
        <Route path="/sudoku" element={<SudokuGame/>} />
      </Routes>
    </>
  );
};

export default App;
