import React, { useState } from 'react';
import { generate, solve } from 'sudoku';
import SudokuBoard from 'sudoku'
const Sudoku = () => {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const generateBoard = () => {
    const puzzle = generate('easy'); // Puedes ajustar la dificultad según tus necesidades
    const formattedBoard = puzzle.map((value) => (value === null ? '' : value));
    const solvedPuzzle = solve(puzzle);
    const formattedSolution = solvedPuzzle.map((value) => (value === null ? '' : value));

    setBoard(formattedBoard);
    setSolution(formattedSolution);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex * 9 + colIndex] = value;
    setBoard(updatedBoard);
  };

  const checkSolution = () => {
    if (board.join('') === solution.join('')) {
      setIsGameOver(true);
    } else {
      setIsGameOver(false);
    }
  };

  const giveUp = () => {
    setIsGameOver(true);
  };

  const buttonStyle = {
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.3rem',
    backgroundColor: '#4285f4',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2>Sudoku</h2>
      <SudokuBoard
        board={board}
        handleCellChange={handleCellChange}
        disabled={isGameOver}
      />
      <button style={buttonStyle} onClick={checkSolution}>Check Solution</button>
      <button style={buttonStyle} onClick={giveUp}>Give Up</button>
    </div>
  );
};

export default Sudoku;
