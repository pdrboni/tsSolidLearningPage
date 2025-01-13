import React, { useEffect, useState } from 'react';
import { S } from './S';
import { O } from './O';
import { L } from './L';
import { I } from './I';
import { D } from './D';
import { useTheme } from '../contexts/ThemeContext';

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
          <S onClick={handleMoveLeft} />
          <O onClick={handleMoveLeft} />
          <L onClick={handleMoveLeft} />
          <I onClick={handleMoveLeft} />
          <D onClick={handleMoveLeft} />
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
