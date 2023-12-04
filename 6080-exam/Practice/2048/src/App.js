import './App.css';
import React from 'react';

function App() {
  const defaultBoard = [[2, '', '', ''], [2, '', 2, ''], [2, '', '', ''], ['', '', '', '']]
  const [board, setBoard] = React.useState(defaultBoard)

  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        down()
        break;
      case "ArrowLeft":
        left();
        left();
        break;
      case "ArrowRight":
        right();
        break;
      default:
        break;
    }
  }
  console.log(board)
  const up = () => {
    const newBoard = [...board];
    for (const column of newBoard) {
      for (let x = 0; x < 4; x++) {
        if (column[x] === '') {
          for (let y = x + 1; y < 4; y++) {
            if (column[y] !== '') {
              column[x] = column[y];
              column[y] = '';
              break;
            }
          }
        } else {
          for (let y = x + 1; y < 4; y++) {
            if (column[y] === column[x]) {
              column[x] = column[x] + column[y];
              column[y] = '';
              break;
            }
          }
        }
      }
    }
    console.log(newBoard)
    setBoard(newBoard)
  }

  const down = () => {
    const newBoard = [...board];
    for (const column of newBoard) {
      for (let x = 3; x >= 0; x--) {
        if (column[x] === '') {
          for (let y = x - 1; y >= 0; y--) {
            if (column[y] !== '') {
              column[x] = column[y];
              column[y] = '';
              break;
            }
          }
        } else {
          for (let y = x - 1; y >= 0; y--) {
            if (column[y] === column[x]) {
              column[x] = column[x] + column[y];
              column[y] = '';
              break;
            }
          }
        }
      }
    }
    console.log(newBoard)
    setBoard(newBoard)
  }

  const left = () => {
    const newBoard = [...board];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 3; y++) {
        if (newBoard[y][x] === '') {
          for (let z = y + 1; z < 4; z++) {
            if (newBoard[z][x] !== '') {
              newBoard[y][x] = newBoard[z][x];
              newBoard[z][x] = '';
              break;
            }
          }
        } else {
          for (let z = y + 1; z < 4; z++) {
            if (newBoard[z][x] === newBoard[y][x]) {
              newBoard[y][x] = newBoard[y][x] + newBoard[z][x];
              newBoard[z][x] = '';
              break;
            }
          }
        }
      }
    }
    console.log(newBoard)
    setBoard(newBoard)
  }

  const right = () => {
    const newBoard = [...board];
    for (let x = 4; x >= 0; x--) {
      for (let y = 3; y >= 0; y--) {
        if (newBoard[y][x] === '') {
          for (let z = y - 1; z >= 0; z--) {
            if (newBoard[z][x] !== '') {
              newBoard[y][x] = newBoard[z][x];
              newBoard[z][x] = '';
              break;
            }
          }
        } else {
          for (let z = y - 1; z >= 0; z--) {
            if (newBoard[z][x] === newBoard[y][x]) {
              newBoard[y][x] = newBoard[y][x] + newBoard[z][x];
              newBoard[z][x] = '';
              break;
            }
          }
        }
      }
    }
    console.log(newBoard)
    setBoard(newBoard)
  }

  return (
    <div className="App" onKeyDown={handleKeyPress} tabIndex='0' ref={elem => elem && elem.focus()}>
      <div className="board">
        {board.map((col, cellIndex) => (
          <div key={cellIndex} className="col">
            {col.map((cell, cellIndex) => (
              <div key={`${cellIndex}-${cellIndex}`} className={`cell ${cell ? 'filled' : 'empty'}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;