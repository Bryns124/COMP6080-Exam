import './App.css';
import logo from './assets/logo.png';
import { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Blanko from './Blanko'
import Slido from './Slido'
import Tetro from './Tetro'

function App() {
  const headerStyle = {
    height: '80px',
    width: '100vw',
    position: 'fixed',
    backgroundColor: '#eeeeee',
    backgroundImg: `url(${logo})`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  const documentStyles = {
    margin: 0,
  };
  const imgStyle = {
    margin: '15px',
    height: '50px',
    width: '50px',
  }
  const footerStyle = {
    height: '50px',
    width: '100vw',
    bottom: '0px',
    position: 'absolute',
    backgroundColor: '#999999'
  }
  let [text, setText] = useState('Home | Blanko | Slido | Tetro')

  useEffect(() => {
    const updateText = () => {
      const mediaQuery = window.matchMedia('(max-width: 800px)');
      if (mediaQuery.matches) {
        setText('H | B | S | T');
      } else {
        setText('Home | Blanko | Slido | Tetro');
      }
    };
    updateText(); // call the function once to set the initial state
    window.addEventListener('resize', updateText); // add event listener
    return () => {
      window.removeEventListener('resize', updateText); // cleanup function to remove the event listener
    };
  }, [])

  return (
    <BrowserRouter>
      <div style={documentStyles}>
        <header style={headerStyle}>
          <img style={imgStyle} src={logo} alt="logo"></img>
          <Link to="/">{text.includes('Home') ? 'Home' : 'H'}</Link> |
          <Link to="/blanko">{text.includes('Blanko') ? 'Blanko' : 'B'}</Link> |
          <Link to="/slido">{text.includes('Slido') ? 'Slido' : 'S'}</Link> |
          <Link to="/tetro">{text.includes('Tetro') ? 'Tetro' : 'T'}</Link> |
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blanko" element={<Blanko />} />
          <Route path="/slido" element={<Slido />} />
          <Route path="/tetro" element={<Tetro />} />
        </Routes>
        <footer style={footerStyle}></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;