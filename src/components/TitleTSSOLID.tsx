import React, { useState } from 'react';
import { S } from './S';
import { O } from './O';
import { L } from './L';
import { I } from './I';
import { D } from './D';

export const TitleTSSOLID = () => {
  const [moveLeft, setMoveLeft] = useState(false);

  const handleMoveLeft = () => {
    setMoveLeft(true);
  };

  return (
    <>
      <div className={`flex-center ${moveLeft ? 'fade-out' : ''}`}>
        <div className="animated-text">
          <S onClick={handleMoveLeft} />
          <O />
          <L />
          <I />
          <D />
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
