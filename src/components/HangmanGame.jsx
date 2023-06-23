
import React, { useState, useEffect } from 'react';

const HangmanGame = ({ duration = 120000 }) => {
  const words = ["Casa", "Perro", "Platano", "Ordenador"]; 
  const [word, setWord] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

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
    <div>
      <p style={styles.maskedWord}>{maskedWord}</p>
      {renderAlphabetButtons()}
      <p style={styles.timer}>{getFormattedTime()}</p>
      {timeUp ? (
        <p style={styles.result}>You lost!</p>
      ) : isWordGuessed() ? (
        <div>
          <p style={styles.result}>You won!</p>
          {gameOver ? (
            <button style={styles.button} onClick={handleRestart}>
              Restart
            </button>
          ) : (
            <button style={styles.button} onClick={handleSolve}>
              Solve
            </button>
          )}
        </div>
      ) : (
        <div>
          <button style={styles.button} onClick={handleSolve}>
            Solve
          </button>
          <button style={styles.button} onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  maskedWord: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  timer: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  result: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  button: {
    fontSize: '16px',
    marginRight: '10px',
    padding: '5px 10px',
  },
};

export default HangmanGame;
