// src/App.js
import React from 'react';
import Quote from './components/Quote';
import Slideshow from './components/Slideshow';
import './App.css'; // Create and style as needed

function App() {
  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <header style={{ textAlign: 'center' }}>
        <h1>Daily Quote & Docs App</h1>
      </header>
      <main>
        <Quote />
        <Slideshow />
      </main>
    </div>
  );
}

export default App;
