import React, { useState } from 'react';
import './Projects.css';
import maintenanceHome from '../assets/maintenance-tracker-home.png';
import maintenanceGarage from '../assets/maintenance-tracker-garage.png';
import maintenanceMaintenance from '../assets/maintenance-tracker-maintenance.png';

function Projects({ darkMode }) {
  const projects = [
    {
      title: "Maintenance Tracker",
      description: "A comprehensive vehicle maintenance tracking application that helps users monitor service records, schedule maintenance, and keep their vehicles in optimal condition.",
      link: "https://d3546o0t7ujhas.cloudfront.net/",
      tags: ["React", "Flask", "AWS", "PostgreSQL"],
      screenshots: [
        { src: maintenanceHome, alt: "Maintenance Tracker Home" },
        { src: maintenanceGarage, alt: "My Garage View" },
        { src: maintenanceMaintenance, alt: "Maintenance Tracking" }
      ]
    },
    {
      title: "Code Explainer",
      description: "An AI-powered code explanation tool that uses Hugging Face LLMs to provide detailed explanations of code snippets. Features line-by-line breakdowns, test case generation, and supports multiple programming languages through both a CLI tool and REST API backend.",
      link: "https://github.com/drfaber15/code-explainer-cli",
      tags: ["Python", "Flask", "Hugging Face", "LLM", "REST API"],
      screenshots: []
    }
  ];
  const [currentScreenshot, setCurrentScreenshot] = useState({});

  return (
    <section className={`projects-page ${darkMode ? 'projects-dark' : 'projects-light'}`}>
      <h1>🚀 My Projects</h1>
      <p className="projects-intro">
        Here are some of the projects I've been working on. Click to explore live demos and learn more!
      </p>
      
      <div className="projects-container">
        {projects.map((project, index) => {
          const currentIndex = currentScreenshot[index] || 0;
          
          return (
            <div key={index} className={`project-card ${darkMode ? 'card-dark' : 'card-light'}`}>
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>
              
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="screenshot-carousel">
                  <img 
                    src={project.screenshots[currentIndex].src} 
                    alt={project.screenshots[currentIndex].alt}
                    className="project-screenshot"
                  />
                  <div className="carousel-controls">
                    <button 
                      className={`carousel-btn ${darkMode ? 'btn-dark' : 'btn-light'}`}
                      onClick={() => setCurrentScreenshot({
                        ...currentScreenshot,
                        [index]: currentIndex === 0 ? project.screenshots.length - 1 : currentIndex - 1
                      })}
                    >
                      ←
                    </button>
                    <div className="carousel-dots">
                      {project.screenshots.map((_, i) => (
                        <span 
                          key={i} 
                          className={`dot ${i === currentIndex ? 'active' : ''}`}
                          onClick={() => setCurrentScreenshot({
                            ...currentScreenshot,
                            [index]: i
                          })}
                        />
                      ))}
                    </div>
                    <button 
                      className={`carousel-btn ${darkMode ? 'btn-dark' : 'btn-light'}`}
                      onClick={() => setCurrentScreenshot({
                        ...currentScreenshot,
                        [index]: currentIndex === project.screenshots.length - 1 ? 0 : currentIndex + 1
                      })}
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
              
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`project-link ${darkMode ? 'link-dark' : 'link-light'}`}
              >
                View Live Demo →
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
