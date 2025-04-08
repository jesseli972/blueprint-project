import React, { useState } from 'react';
import Quote from './components/Quote';
import Slideshow from './components/Slideshow';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const appStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: darkMode ? '#1e1e1e' : 'white',
    color: darkMode ? '#f5f5f5' : 'black',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="App" style={appStyle}>
      <header style={{ textAlign: 'center' }}>
        <h1>Morning Daily Quote & Docs App</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main>
        <Quote />
        <Slideshow />
      </main>
    </div>
  );
}

export default App;
