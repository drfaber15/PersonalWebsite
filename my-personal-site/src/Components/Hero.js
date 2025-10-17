import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero({ darkMode }) {
  return (
    <section className={`hero ${darkMode ? 'hero-dark' : 'hero-light'}`}>
      <h1>
        Welcome to{' '}
        <span className={`highlight ${darkMode ? 'highlight-dark' : 'highlight-light'}`}>
          Dane’s Website
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
        <h2>🚧 Personal Projects in Progress</h2>
        <p>
          I’m currently deep in development on several creative and technical projects — from real-time systems to experimental interfaces. This space will soon showcase demos, write-ups, and behind-the-scenes insights. Stay tuned!
        </p>
      </div>
    </section>
  );
}

export default Hero;
