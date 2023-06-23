import React from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import TicTacToe from "./components/TicTacToe";
import HangmanGame from "./components/HangmanGame";
import SudokuGame from "./components/SudokuGame";

const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/tictactoe" element={<TicTacToe/>} />
        <Route path="/hangman" element={<HangmanGame/>} />
        <Route path="/sudoku" element={<SudokuGame/>} />
      </Routes>
    </>
  );
};

export default App;
