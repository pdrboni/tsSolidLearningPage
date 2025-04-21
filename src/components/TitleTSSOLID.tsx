import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { LetterComponent } from './LetterComponent';

export const TitleTSSOLID = () => {
  const { theme } = useTheme();
  const [moveLeft, setMoveLeft] = useState(false);
  const [fadeInExplanation, setFadeInExplanation] = useState(false);

  const handleMoveLeft = () => {
    setMoveLeft(true);
  };

  const handleFadeInExplanation = (): void => {
    setTimeout(() => {
      setFadeInExplanation(true);
    }, 3000); // 3000ms = 3 seconds
  };

  useEffect(() => {
    handleFadeInExplanation();
  }, []);

  return (
    <>
      <div className={`title-solid-container ${moveLeft ? 'fade-out' : ''}`}>
        <div
          className={`${fadeInExplanation ? 'fade-in-explanation' : 'visually-hidden'} site-explanation`}
        >
          <span>Do you know SOLID Principles?</span>
          <br />
          <span>Explore this site to know more about it!</span>
          <br />
          <span>Click a letter to know more :D</span>
          <br />
        </div>
        <div className={`animated-text ${theme}`}>
          <LetterComponent
            onClick={handleMoveLeft}
            letter="S"
            subtitle="Single Responsibility Principle"
            link="/srp"
          />
          <LetterComponent
            onClick={handleMoveLeft}
            letter="O"
            subtitle="Open-closed Principle"
            link="/ocp"
          />
          <LetterComponent
            onClick={handleMoveLeft}
            letter="L"
            subtitle="Liskov Substitution Principle"
            link="/lsp"
          />
          <LetterComponent
            onClick={handleMoveLeft}
            letter="I"
            subtitle="Interface Segregation Principle"
            link="/isp"
          />
          <LetterComponent
            onClick={handleMoveLeft}
            letter="D"
            subtitle="Dependency Inversion Principle"
            link="/dip"
          />
        </div>
      </div>
      <div
        className={`${moveLeft ? 'fade-in flex-center' : 'visually-hidden'}`}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ width: '3rem', height: '3rem', borderWidth: '0.6rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};
