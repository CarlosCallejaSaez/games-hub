import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import TicTacToe from "./components/TicTacToe";
import HangmanGame from "./components/HangmanGame";
import SudokuGame from "./components/SudokuGame";
import LoginForm from "./components/LoginForm";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("user");

  const ProtectedRoute = ({ path, element }) => {
    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/" replace state={{ from: path }} />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route
        path="/tictactoe"
        element={<ProtectedRoute element={<TicTacToe />} />}
      />
      <Route
        path="/hangman"
        element={<ProtectedRoute element={<HangmanGame />} />}
      />
      <Route
        path="/sudoku"
        element={<ProtectedRoute element={<SudokuGame />} />}
      />

      
    </Routes>
  );
};

export default App;
