import React, { useState, useEffect } from "react";
import Sudoku from "sudoku"; 
import { useNavigate } from "react-router-dom";

const SudokuGame = () => {
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [victory, setVictory] = useState(false);
  const [mistake, setMistake] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newBoard = Sudoku.makepuzzle();
    const solvedBoard = Sudoku.solvepuzzle(newBoard);
    setBoard(newBoard);
    setCompleted(false);
    setVictory(false);
    setMistake(false);
    setShowSolution(false);
  };

  const checkSolution = () => {
    const isSolutionValid = Sudoku.solvepuzzle(board);
    if (isSolutionValid) {
      setVictory(true);
    } else {
      setMistake(true);
    }
  };

  const completeSudoku = () => {
    const solvedBoard = Sudoku.solvepuzzle(board);
    setBoard(solvedBoard);
    setShowSolution(true);
  };

  const solveSudoku = () => {
    const solvedBoard = Sudoku.solvepuzzle(board);
    setBoard(solvedBoard);
    setCompleted(true);
    setVictory(true);
  };

  const handleCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row * 9 + col] = value;
    setBoard(newBoard);
  };

  const renderCell = (cell, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const isEditable = !completed && cell === null;

    const handleChange = (e) => {
      const value = parseInt(e.target.value);
      if (isNaN(value) || value < 1 || value > 9) {
        handleCellChange(row, col, null);
      } else {
        handleCellChange(row, col, value);
      }
    };

    return (
      <td key={index} style={styles.cell}>
        {isEditable ? (
          <input
            type="number"
            min="1"
            max="9"
            value={cell || ""}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <div style={styles.cellValue}>{cell}</div>
        )}
      </td>
    );
  };

  return (
    <div style={styles.container}>
      <button onClick={handleHome}>Back Home Page</button>
      <button onClick={startGame} style={styles.button}>
        Start Game
      </button>
      <table style={styles.table}>
        <tbody>
          {[...Array(9)].map((_, row) => (
            <tr key={row}>
              {[...Array(9)].map((_, col) =>
                renderCell(showSolution ? Sudoku.solvepuzzle(board)[row * 9 + col] : board[row * 9 + col], row * 9 + col)
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {completed && (
        <div>
          <button
            disabled={!board.every((cell) => cell !== null)}
            onClick={checkSolution}
            style={styles.button}
          >
            Check Solution
          </button>
          <button onClick={completeSudoku} style={styles.button}>
            Show Solution
          </button>
          <button onClick={startGame} style={styles.button}>
            Start New Game
          </button>
        </div>
      )}
      {victory && (
        <div>
          <p style={styles.message}>Congratulations! You have solved the Sudoku puzzle.</p>
          <button onClick={startGame} style={styles.button}>
            Start New Game
          </button>
        </div>
      )}
      {mistake && (
        <div>
          <p style={styles.message}>Sorry, your solution is incorrect.</p>
          <button onClick={startGame} style={styles.button}>
            Try Again
          </button>
        </div>
      )}
      {!completed && (
        <div>
          <button onClick={solveSudoku} style={styles.button}>
            Solve Sudoku
          </button>
        </div>
      )}
    </div>
  );
};

export default SudokuGame;

const styles = {
  container: {
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    margin: 10,
    padding: "8px 16px",
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    margin: "0 auto",
  },
  cell: {
    padding: 5,
    border: "1px solid black",
  },
  input: {
    width: 30,
    height: 30,
    fontSize: 16,
    textAlign: "center",
  },
  cellValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
  },
};
