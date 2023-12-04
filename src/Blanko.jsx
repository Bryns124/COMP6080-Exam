import React from 'react';
import { strs } from './data/blanko';

function Blanko() {
  const blankoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
  const squareStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    border: '2px black solid',
    margin: '-1px'
  }
  const inputStyle = {
    width: '48px',
    height: '48px',
    border: '2px black solid',
    margin: '-1px',
    textAlign: 'center',
  }

  const getRandomString = () => {
    const randomIndex = Math.floor(Math.random() * strs.length);
    const randomString = strs[randomIndex];
    return randomString;
  }
  const stringToDisplay = getRandomString().split('');
  const inputIndices = [];
  while (inputIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * stringToDisplay.length);
    if (stringToDisplay[randomIndex] && !inputIndices.includes(randomIndex)) {
      inputIndices.push(randomIndex);
    }
  }
  let numCorrect = 0;
  const handleInputChanges = (index, value) => {
    if (value.toLowerCase() === stringToDisplay[index].toLowerCase()) {
      numCorrect++;
      console.log('correct is', numCorrect)
      if (numCorrect === 3) {
        alert('Correct!')
        localStorage.setItem("games-won", parseInt(localStorage.getItem("games-won")) + 1)
      }
    }
  }
  function refreshPage(){ 
    window.location.reload(); 
  }
  const squares = []
  for (let i = 0; i < stringToDisplay.length; i++) {
    if (inputIndices.includes(i)) {
      squares.push(
        <input style={inputStyle} key={i} onChange={(event) => handleInputChanges(i, event.target.value)} />
      );
    } else {
      squares.push(
        <div style={squareStyle} key={i}>
          {stringToDisplay[i]}
        </div>
      );
    }
  }
  console.log(squares)
  return (
    <div style={blankoStyle}>
      {squares}
      <button type="button" onClick={ refreshPage }>Reset</button> 
    </div>
  );
}

export default Blanko;
