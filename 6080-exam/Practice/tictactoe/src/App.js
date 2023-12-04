import './App.css';
import React from 'react';

function App() {
  const defaultBoard = [['', '', ''], ['', '', ''], ['', '', '']];
  const [board, setBoard] = React.useState(defaultBoard);
  const [turn, setTurn] = React.useState('X');
  const [winningTiles, setWinningTiles] = React.useState([])
  const [winner, setWinnerMsg] = React.useState('')

  const handleTurn = (y, x) => {
    if (!winner && board[y][x] === '') {
      let newBoard = [...board];
      newBoard[y][x] = turn;
      setTurn(turn === 'X' ? 'O' : 'X');
      setBoard(newBoard);
      checkWin(turn)
    }
  };

  const checkWin = (player) => {
    // Check for horizontal
    for (let y = 0; y < 3; y++) {
      if (board[y][0] === player && board[y][1] === player && board[y][2] === player) {
        setGameWinner([board[y][0], board[y][1], board[y][2]], player)
        return true;
      }
    }
    // Check for vertical
    for (let x = 0; x < 3; x++) {
      if (board[0][x] === player && board[1][x] === player && board[2][x] === player) {
        setGameWinner([board[0][x], board[1][x], board[2][x]], player)
        return true;
      }
    }
    // Check for diagonal
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      setGameWinner([board[0][0], board[1][1], board[2][2]], player)
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      setGameWinner([board[0][2], board[1][1], board[2][0]], player)
      return true;
    }
    return false;
  };

  const setGameWinner = (winningTiles, player) => {
    setWinningTiles(winningTiles)
    setWinnerMsg(player)
    let winCount = localStorage.getItem(`${player}-wins`)
    localStorage.setItem(`${player}-wins`, winCount ? parseInt(winCount) + 1 : 1)
  }
  
  const checkWinningTile = (y, x) => {
    console.log('y and x', y, x)
    if (winningTiles.includes(board[y][x])) {
      return 'winningTile';
    }
    return '';
  }

  return (
    <div className="parent">
      {board.map((row, y) => {
        return (
          <div className="row">
            {row.map((value, x) => {
              return <button className={checkWinningTile(y, x)} onClick={() => handleTurn(y, x)}>{value}</button>
            })}
          </div>
        )
      })}
      {winner && <div>
        <div>The winner is : {winner}!</div>
        <div>The winner has won {localStorage.getItem(`${winner}-wins`)} times!</div>
      </div>}
    </div> 
  );
}

export default App;
