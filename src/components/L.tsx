import React, { useState } from 'react';
import { handleMouseOver } from '../utils/functions/handleMouseOver';
import { Link } from 'react-router';

export const L = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <Link style={{ color: 'black', textDecoration: 'none' }} to={'lsp'}>
        <span
          className="letter-solid"
          onMouseOver={() => handleMouseOver(setIsHover)}
          onMouseLeave={() => handleMouseOver(setIsHover)}
        >
          L
        </span>
      </Link>
      <div
        className="principle-name"
        style={{ display: isHover ? 'inline-block' : 'none' }}
      >
        <span style={{ fontSize: '18px' }}>Liskov Substitution Principle</span>
      </div>
    </>
  );
};
