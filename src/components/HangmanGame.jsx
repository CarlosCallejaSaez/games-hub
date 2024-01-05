
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import VideoComponent from './VideoComponent';


const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  font-size: 16px;
  padding: 5px 10px;
`;

const MaskedWord = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Timer = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Result = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const StyledButton = styled.button`
  font-size: 16px;
  margin-right: 10px;
  padding: 5px 10px;
`;

const AlphabetButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

const HangmanGame = ({ duration = 120000 }) => {

  


  const [videoEnded, setVideoEnded] = useState(false);



  const youtubeVideoUrl = 'https://www.youtube.com/watch?v=831_CEyd3o0';

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };


  const words = ["Casa", "Perro", "Platano", "Ordenador"]; 
  const [word, setWord] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeUp(true);
      setGameOver(true);
    }, duration);

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex].toUpperCase());
  }, []);

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      setCorrectGuesses([...correctGuesses, letter]);
    }
  };

  const isLetterGuessed = (letter) => correctGuesses.includes(letter);

  const isWordGuessed = () => {
    return word.split('').every((letter) => isLetterGuessed(letter));
  };

  const handleSolve = () => {
    setCorrectGuesses(word.split(''));
    setGameOver(true);
  };

  const handleRestart = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex].toUpperCase());
    setCorrectGuesses([]);
    setTimeUp(false);
    setRemainingTime(duration);
    setGameOver(false);
  };

  const renderAlphabetButtons = () => {
    const startCharCode = 'A'.charCodeAt(0);
    const endCharCode = 'Z'.charCodeAt(0);
    const alphabetButtons = [];

    for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
      const letter = String.fromCharCode(charCode);
      const isGuessed = isLetterGuessed(letter);

      alphabetButtons.push(
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={isGuessed || gameOver}
        >
          {letter}
        </button>
      );
    }

    return alphabetButtons;
  };

  const maskedWord = word
    .split('')
    .map((letter) => (isLetterGuessed(letter) ? letter : '_'))
    .join(' ');

  const getFormattedTime = () => {
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <CenteredContainer>
      {!videoEnded ? (
        <VideoComponent videoUrl={youtubeVideoUrl} onVideoEnded={handleVideoEnded} />
      ) : (
        <CenteredContainer>
          <Button onClick={handleHome}>Back Home Page</Button>
          <MaskedWord>{maskedWord}</MaskedWord>
          <AlphabetButtonsContainer>{renderAlphabetButtons()}</AlphabetButtonsContainer>
          <Timer>{getFormattedTime()}</Timer>
          {timeUp ? (
            <Result>You lost!</Result>
          ) : isWordGuessed() ? (
            <Container>
              <Result>You won!</Result>
              {gameOver ? (
                <StyledButton onClick={handleRestart}>Restart</StyledButton>
              ) : (
                <StyledButton onClick={handleSolve}>Solve</StyledButton>
              )}
            </Container>
          ) : (
            <Container>
              <StyledButton onClick={handleSolve}>Solve</StyledButton>
              <StyledButton onClick={handleRestart}>Restart</StyledButton>
            </Container>
          )}
        </CenteredContainer>
      )}
   </CenteredContainer>
  );
};

export default HangmanGame;