import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero({ darkMode }) {
  return (
    <section className={`hero ${darkMode ? 'hero-dark' : 'hero-light'}`}>
      <h1>
        Welcome to{' '}
        <span className={`highlight ${darkMode ? 'highlight-dark' : 'highlight-light'}`}>
          Dane's Website
        </span>
      </h1>
      <p>Exploring code, vision, and creativity.</p>

      {/* Button links to /projects */}
      <Link to="/projects" className={`cta ${darkMode ? 'cta-dark' : 'cta-light'}`}>
        View Projects →
      </Link>

      {/* Divider Line */}
      <div className="hero-divider" />

      {/* Personal Projects Banner */}
      <div className="project-banner">
        <h2>🚗 Featured Project: Maintenance Tracker</h2>
        <p>
          Check out my latest project — a full-stack vehicle maintenance tracking application built with React and AWS. 
          Track service records, schedule maintenance, and keep your vehicles in optimal condition with an intuitive, 
          user-friendly interface. Click "View Projects" above to explore the live demo and see screenshots!
        </p>
      </div>
    </section>
  );
}

export default Hero;
