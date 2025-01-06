import React, { useState } from 'react';
import { handleMouseOver } from '../utils/functions/handleMouseOver';
import { Link } from 'react-router';

export const O = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <Link style={{ color: 'black', textDecoration: 'none' }} to={'ocp'}>
        <span
          className="letter-solid"
          onMouseOver={() => handleMouseOver(setIsHover)}
          onMouseLeave={() => handleMouseOver(setIsHover)}
        >
          O
        </span>
      </Link>
      <div
        className="principle-name"
        style={{ display: isHover ? 'inline-block' : 'none' }}
      >
        <span style={{ fontSize: '18px' }}>Open-closed Principle</span>
      </div>
    </>
  );
};
