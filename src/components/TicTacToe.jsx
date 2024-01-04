import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import VideoComponent from './VideoComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
`;

const BackButton = styled.button`
  align-self: flex-start;
  margin: 10px;
`;

const Title = styled.h2`
  margin-top: 20px;
`;

const PlayerInfo = styled.p`
  margin-top: 10px;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const CellButton = styled.button`
  width: 100px;
  height: 100px;
  font-size: 24px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ResultMessage = styled.p`
  margin-top: 20px;
`;

const ResetButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
`;


const TicTacToe = () => {

  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };



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
      <div>
      {!videoEnded ? (
        <VideoComponent
          videoUrl="../assets/tic-tac-toe.mp4"
          onVideoEnded={handleVideoEnded}
        />
      ) :
      (<Container>
        <BackButton onClick={handleHome}>Back Home Page</BackButton>
        <Title>Tic Tac Toe</Title>
        {!winner && !isDraw && <PlayerInfo>Current Player: {currentPlayer}</PlayerInfo>}
        {winner && <ResultMessage>Winner: {winner}</ResultMessage>}
        {isDraw && <ResultMessage>It's a draw!</ResultMessage>}
        <BoardContainer>
          {board.map((cell, index) => (
            <CellButton key={index} onClick={() => handleCellClick(index)}>
              {cell}
            </CellButton>
          ))}
        </BoardContainer>
        {(winner || isDraw) && (
          <ResetButton onClick={resetGame}>Reset Game</ResetButton>
        )}
      </Container>)}
      </div>
    );
  };
  
  export default TicTacToe;