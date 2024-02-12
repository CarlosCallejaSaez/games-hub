import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import TicTacToe from "./components/TicTacToe";
import HangmanGame from "./components/HangmanGame";
import SudokuGame from "./components/SudokuGame";
import Login from "./components/Login";
import { ChakraProvider } from '@chakra-ui/react';


const App = () => {
  

  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
};

export default App;
