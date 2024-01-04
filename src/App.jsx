import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import TicTacToe from "./components/TicTacToe";
import HangmanGame from "./components/HangmanGame";
import SudokuGame from "./components/SudokuGame";
import Login from "./components/Login";


const App = () => {
  

  return (

    <Routes>
       <Route path="/" element={<Login/>}  />
      <Route path="/home" element={<Home />}  />
      <Route
        path="/tictactoe"
        element={<TicTacToe />}
      />
      <Route
        path="/hangman"
        element={<HangmanGame />}
      />
      <Route
        path="/sudoku"
        element={<SudokuGame />}
      />

     

      
    </Routes>
    
  );
};

export default App;
