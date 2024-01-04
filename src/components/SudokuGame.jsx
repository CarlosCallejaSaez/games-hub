import React, { useState, useEffect } from "react";
import Sudoku from "sudoku";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import VideoComponent from "./VideoComponent";


const Container = styled.div`
  text-align: center;
  margin-top: 20px;
  width: 100vw;
`;

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
`;

const Table = styled.table`
  margin: 0 auto;
`;

const Cell = styled.td`
  padding: 5px;
  border: 1px solid black;
`;

const Input = styled.input`
  width: 30px;
  height: 30px;
  font-size: 16px;
  text-align: center;
`;

const CellValue = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: bold;
`;


const SudokuGame = () => {


  
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };


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
      <Cell key={index}>
        {isEditable ? (
          <Input
            type="number"
            min="1"
            max="9"
            value={cell || ""}
            onChange={handleChange}
          />
        ) : (
          <CellValue>{cell}</CellValue>
        )}
      </Cell>
    );
  };

  return (
    <div>
      {!videoEnded ? (
        <VideoComponent
          videoUrl="../assets/sudoku.mp4"
          onVideoEnded={handleVideoEnded}
        />
      ) :
   ( <Container>
      <Button onClick={handleHome}>Back Home Page</Button>
      <Button onClick={startGame}>Restart Game</Button>
      <Table>
        <tbody>
          {[...Array(9)].map((_, row) => (
            <tr key={row}>
              {[...Array(9)].map((_, col) =>
                renderCell(
                  showSolution
                    ? Sudoku.solvepuzzle(board)[row * 9 + col]
                    : board[row * 9 + col],
                  row * 9 + col
                )
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {completed && (
        <div>
          <Button
            disabled={!board.every((cell) => cell !== null)}
            onClick={checkSolution}
          >
            Check Solution
          </Button>
          <Button onClick={completeSudoku}>Show Solution</Button>
          <Button onClick={startGame}>Start New Game</Button>
        </div>
      )}
      {victory && (
        <div>
          <Message>Congratulations! You have solved the Sudoku puzzle.</Message>
          <Button onClick={startGame}>Start New Game</Button>
        </div>
      )}
      {mistake && (
        <div>
          <Message>Sorry, your solution is incorrect.</Message>
          <Button onClick={startGame}>Try Again</Button>
        </div>
      )}
      {!completed && (
        <div>
          <Button onClick={solveSudoku}>Solve Sudoku</Button>
        </div>
      )}
    </Container>)}
    </div>
  );
};

export default SudokuGame;

