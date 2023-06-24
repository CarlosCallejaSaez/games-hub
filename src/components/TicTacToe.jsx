import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    
    const navigate = useNavigate();
    const handleHome = () => {
      navigate("/home");
    };
  
    const handleCellClick = (index) => {
      if (!board[index] && !winner) {
        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;
        setBoard(updatedBoard);
        checkWinner(updatedBoard, currentPlayer);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    };
  
    const checkWinner = (board, player) => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player && board[b] === player && board[c] === player) {
          setWinner(player);
          return;
        }
      }
  
      if (board.every((cell) => cell !== '')) {
        setIsDraw(true);
      }
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(''));
      setCurrentPlayer('X');
      setWinner(null);
      setIsDraw(false);
    };
  
    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleHome}>Back Home Page</button>
        <h2>Tic Tac Toe</h2>
        {!winner && !isDraw && <p>Current Player: {currentPlayer}</p>}
        {winner && <p>Winner: {winner}</p>}
        {isDraw && <p>It's a draw!</p>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gridGap: '10px',
            justifyContent: 'center',
          }}
        >
          {board.map((cell, index) => (
            <button
              key={index}
              style={{
                width: '100px',
                height: '100px',
                fontSize: '24px',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
        {(winner || isDraw) && (
          <button
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '18px',
              cursor: 'pointer',
            }}
            onClick={resetGame}
          >
            Reset Game
          </button>
        )}
      </div>
    );
  };
  

export default TicTacToe