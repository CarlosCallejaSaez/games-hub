import React from 'react'
import styled from "styled-components"
const Home = () => {

 

    return (
      <>
        <h2>Home</h2>
        <p>Click on the game you want to play:</p>
        <ul>
          <li>
            <a href="/tictactoe">Tic Tac Toe</a>
          </li>
          <li>
            <a href="/hangman">Hangman</a>
          </li>
          <li>
            <a href="/sudoku">Sudoku</a>
          </li>
        </ul>
        </>
    );
  };
  
export default Home