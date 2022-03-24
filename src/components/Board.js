import React, { useState } from "react";
import './styles/Board.css';
import Square from "./Square";

function Board() {
    const [state, setState] = useState({
      squares: Array(9).fill(null), // keeping state of the board
      isXNext: true // keeping state of which player's turn it is
    });

    let status; // display message
    const who_won = winner(state.squares);
    if (who_won) {
      status = `${who_won} is the winner! Reload for new game.`;
    } else {
      if (!state.squares.includes(null)) {
        status = "It's a tie! Reload for new game.";
      } else {
        status = state.isXNext ? "X's turn!" : "O's turn!";
      }
    }

    function renderSquare(i) {
        return (
          <Square 
            value={state.squares[i]} 
            onClick={() => handleClick(i)}
          />
        );
    }

    function handleClick(i) {
      if (winner(state.squares) || state.squares[i]) {
        return;
      }

      let squares_copy = state.squares.slice();
      squares_copy[i] = state.isXNext ? 'X' : 'O';
      setState({
        squares : squares_copy,
        isXNext : !state.isXNext
      });
    }

    function winner(squares) {
      let win_cases = [
        [0, 1, 2], // rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // main diagonal
        [2, 4, 6] // antidiagonal
      ];

      for (let i = 0; i < win_cases.length; i++) {
        const [a, b, c] = win_cases[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }

      return null;
    }

    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
        </div>
    )
}

export default Board;