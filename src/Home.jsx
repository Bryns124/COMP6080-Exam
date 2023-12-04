import React from 'react';

function Home() {
  if (localStorage.getItem("games-won") === null) {
    localStorage.setItem("games-won", 0)
  }
  const [gamesWon, setGamesWon] = React.useState(localStorage.getItem("games-won"))
  const resetGamesWon = () => {
    setGamesWon(0)
    localStorage.setItem("games-won", 0)
  } 
  const homeStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  return (
    <div style={homeStyle}>
      <h1 styel={{ color: 'red', fontSize: '2em' }}>Please choose an option from the navbar.</h1>
      <p>Games won: {gamesWon}</p>
      <button onClick={resetGamesWon}>Reset</button>
    </div>
  );
}

export default Home;