import React from 'react';

function Slido() {
  const slidoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  const gridStyle = {
    display: 'grid',
    gridTemplate: 'repeat(3, 150px) / repeat(3, 150px)',
  };
  const cellStyle = {
    border: '1px solid #333',
    margin: '0',
  };
  const images = require.context('./data/shrek', false, /\.(png)$/);
  const shuffledImages = images.keys().sort(() => Math.random() - 0.5);
  const [positions, setPositions] = React.useState(shuffledImages.concat(''));
  const isSolvedRef = React.useRef(false);

  const handleClick = (index) => {
    const blankIndex = positions.indexOf('');
    const adjacentIndices = getAdjacentIndices(blankIndex);
    if (adjacentIndices.includes(index)) {
      const newPositions = [...positions];
      newPositions[blankIndex] = positions[index];
      newPositions[index] = '';
      setPositions(newPositions);
    }
  };

  const getAdjacentIndices = (index) => {
    const topIndex = index - 3;
    const bottomIndex = index + 3;
    const leftIndex = index % 3 === 0 ? null : index - 1;
    const rightIndex = (index + 1) % 3 === 0 ? null : index + 1;
    return [topIndex, bottomIndex, leftIndex, rightIndex].filter(
      (i) => i !== null && i >= 0 && i < 9
    );
  };

  const Grid = () => {
    return (
      <div style={gridStyle}>
        {positions.map((path, index) => (
          <div key={index} style={cellStyle} onClick={() => handleClick(index)}>
            {path ? <img src={require(`./data/shrek/${path.slice(2)}`)} alt={path} /> : null}
          </div>
        ))}
      </div>
    );
  };
  const properImages = images.keys().concat('')
  const handleCorrect = React.useCallback(() => {
    if (positions.every((path, index) => path === properImages[index])) {
      alert('Correct!');
      localStorage.setItem('games-won', parseInt(localStorage.getItem('games-won')) + 1);
      isSolvedRef.current = true;
    }
  }, [positions, properImages]);

  React.useEffect(() => {
    handleCorrect();
  }, [handleCorrect]);

  const handleSolveClick = (e) => {
    setPositions(images.keys().concat(''))
    localStorage.setItem('games-won', parseInt(localStorage.getItem('games-won')) - 1);
  }

  function refreshPage(){ 
    window.location.reload(); 
  }

  return (
    <div style={slidoStyle}>
      <Grid />
      <button onClick={handleSolveClick} disabled={isSolvedRef.current}>Solve</button>
      <button onClick={ refreshPage }>Reset</button> 
    </div>
  );
}

export default Slido;
