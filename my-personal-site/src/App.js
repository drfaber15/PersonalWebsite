import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import ShootingStars from './Components/ShootingStars';
import About from './Components/About';
import Projects from './Components/Projects';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Optional: Persist theme across refresh
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) setDarkMode(JSON.parse(savedTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? 'App dark' : 'App light'}>
        <ShootingStars darkMode={darkMode} />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Hero darkMode={darkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/Projects" element={<Projects darkMode={darkMode} />} />
          {/* Add other pages here and pass darkMode to each */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
