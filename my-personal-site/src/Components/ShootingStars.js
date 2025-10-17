import React, { useMemo } from 'react';

const ShootingStars = ({ darkMode }) => {
  // Generate static stars once
  const staticStars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      return { id: i, top, left };
    });
  }, []);

  // Generate shooting stars once
  const shootingStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const delay = `${Math.random() * 5}s`;
      return { id: i, top, left, delay };
    });
  }, []);

  return (
    <>
      {staticStars.map(({ id, top, left }) => (
        <div
          key={`static-${id}`}
          className={`static-star ${darkMode ? 'fade-in' : 'fade-out'}`}
          style={{ top, left }}
        />
      ))}
      {shootingStars.map(({ id, top, left, delay }) => (
        <div
          key={`shooting-${id}`}
          className="star"
          style={{ top, left, animationDelay: delay }}
        />
      ))}
    </>
  );
};

export default ShootingStars;
