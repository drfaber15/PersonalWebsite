import React from 'react';
import './About.css';
import profileImage from '../assets/dane-profile.jpg';

function About({ darkMode }) {
  return (
    <section className={`about-page ${darkMode ? 'about-dark' : 'about-light'}`}>
      <div className="about-content">
        <img src={profileImage} alt="Dane" className="profile-pic" />
        <h1>Hey, I'm Dane.</h1>
        <p>
          I’m a full stack developer passionate about building secure tools, clean interfaces, and robust backend systems.
          I created this site from scratch to showcase my work, skills, and style — blending technical rigor with expressive design.
          My experience spans manufacturing systems, web platforms, and DevSecOps, always with a focus on performance, reliability,
          and user experience. I especially enjoy architecting backend logic that powers scalable, secure, and efficient applications.
        </p>
        <a href="/resume.pdf" className="resume-button" download>
          Download My Resume
        </a>
      </div>

      {/* Tech Stack Section */}
      <div className="tech-stack">
  <h2>Tech Stack</h2>
  <ul>
    <li><strong>Languages:</strong> Python, Java, C, JavaScript, C++, R, Xbasic</li>
    <li><strong>Frontend:</strong> React, React Native, Typescript, HTML, CSS, Bootstrap, Figma</li>
    <li><strong>Backend & DevOps:</strong> MSSQL, FastAPI, Docker, REST, GitLab CI/CD, Bash</li>
    <li><strong>Tools:</strong> Git, Pytorch, ChatGPT, Microsoft Azure, IntelliJ, PyCharm, CLion, Visual Studio</li>
    <li><strong>Practices:</strong> DevSecOps, Agile/Scrum, CMMC L3 Compliance, Software Quality Assurance</li>
  </ul>
</div>


      {/* Personal Projects Section */}
      <div className="personal-projects">
        <h2>Personal Projects</h2>
        <p>I'm currently working on new personal projects — this space will be updated soon with details and demos.</p>
      </div>
    </section>
  );
}

export default About;
