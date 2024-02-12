import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, VStack, Progress, useToast, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 

const HangmanGame = () => {
  const [guess, setGuess] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');

  const wordsToGuess = ['example', 'react', 'chakra', 'javascript', 'coding'];
  const maxWrongAttempts = 6;

  const toast = useToast();
  const navigate = useNavigate(); 

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * wordsToGuess.length);
    setSelectedWord(wordsToGuess[randomIndex].toUpperCase());
    setGuessedLetters([]);
    setWrongGuesses([]);
  };

  const handleGuess = () => {
    if (guess.trim() === '') return;

    if (!selectedWord.includes(guess.toUpperCase())) {
      if (!wrongGuesses.includes(guess.toUpperCase())) {
        setWrongGuesses(prev => [...prev, guess.toUpperCase()]);
      } else {
        toast({
          title: 'Letter already guessed!',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      if (!guessedLetters.includes(guess.toUpperCase())) {
        setGuessedLetters(prev => [...prev, guess.toUpperCase()]);
      }
    }
    setGuess('');
  };

  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      bgImage="url('./cyberpunk.gif')" 
      bgSize="cover"
      bgPosition="center"
    >
      <VStack spacing={4} m="20px" bg="whiteAlpha.800" p={5} borderRadius="md" boxShadow="xl" width="100vw">
        <Text fontSize="2xl">Hangman Game</Text>
        <Progress value={(wrongGuesses.length / maxWrongAttempts) * 100} width="90%" hasStripe isAnimated colorScheme="pink"/>
        <Text fontSize="md">{`Attempts: ${wrongGuesses.length} / ${maxWrongAttempts}`}</Text>
        <Box>
          {selectedWord.split('').map((letter, index) => (
            <Text as="span" key={index} fontSize="xl" mx={1}>
              {guessedLetters.includes(letter) ? letter : '_'}
            </Text>
          ))}
        </Box>
        <Input
          placeholder="Guess a letter"
          value={guess}
          onChange={e => setGuess(e.target.value.toUpperCase())}
          maxLength={1}
          width="200px"
        />
        <Button colorScheme="teal" onClick={handleGuess} isDisabled={wrongGuesses.length >= maxWrongAttempts}>Guess</Button>
        <Button colorScheme="orange" onClick={resetGame}>New Word</Button>
        <Button colorScheme="blue" onClick={() => navigate('/home')}>Go Home Page</Button>
        <Text>Wrong guesses: {wrongGuesses.join(', ')}</Text>
        {wrongGuesses.length >= maxWrongAttempts && <Text color="red.500">Game Over. The word was: {selectedWord}</Text>}
      </VStack>
    </Flex>
  );
};

export default HangmanGame;
