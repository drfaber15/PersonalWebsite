import React from 'react';
import './Projects.css'; // Optional: create this for styling

function Projects({ darkMode }) {
  return (
    <section className={`projects-page ${darkMode ? 'projects-dark' : 'projects-light'}`}>
      <h1>🚀 My Projects</h1>
      <p>
        I’m actively working on several personal and technical projects — this page will soon showcase demos, write-ups, and behind-the-scenes insights.
      </p>
    </section>
  );
}

export default Projects;
