import React from 'react';

function Tetro() {
  const tetroStyle = {
    margin: '20px 20px 100px 20px'
  }
  const gridStyle = {
    display: 'grid',
    gridTemplate: 'repeat(12, 70px) / repeat(10, 70px)',
  };
  const cellStyle = {
    border: '1px solid #333333',
    margin: '0',
    background: 'transparent'
  };
  const [gameStarted, setGameStarted] = React.useState(false);
  const [currentBlock, setCurrentBlock] = React.useState(null);

  const handleGameStarted = () => {
    setGameStarted(true);
  };

  React.useEffect(() => {
    if (gameStarted) {
      setCurrentBlock(chooseBlock());
    }
  }, [gameStarted]);

  const tetrisGrid = () => {
    const boxes = [];
    for (let i = 0; i < 120; i++) {
      boxes.push(<div key={i} style={cellStyle}></div>);
    }
    return (
      <div style={gridStyle} onClick={handleGameStarted}>
        {boxes}
      </div>
    );
  };

  const chooseBlock = () => {
    const blockShapes = [
      [
        [1, 1],
        [1, 1]
      ],
      [
        [1],
        [1],
        [1]
      ],
      [
        [1]
      ]
    ];
    const randomNumber = Math.floor(Math.random() * blockShapes.length);
    return blockShapes[randomNumber];
  };
  return (
    <div style={tetroStyle}>
      {tetrisGrid()}
    </div>
  );
}

export default Tetro;
