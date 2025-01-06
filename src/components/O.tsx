import React, { useState } from 'react';
import { handleMouseOver } from '../utils/functions/handleMouseOver';
import { useNavigate } from 'react-router';

export const O = ({ onClick }: { onClick: () => void }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(); // Trigger the move-left animation
    setTimeout(() => {
      navigate('/ocp'); // Navigate to the desired route after 3 seconds
    }, 3000); // 3000ms = 3 seconds
  };

  return (
    <>
      <span
        className="letter-solid"
        onMouseOver={() => handleMouseOver(setIsHover)}
        onMouseLeave={() => handleMouseOver(setIsHover)}
        onClick={handleClick}
      >
        O
      </span>
      <div
        className="principle-name"
        style={{ display: isHover ? 'inline-block' : 'none' }}
      >
        <span style={{ fontSize: '18px' }}>Open-closed Principle</span>
      </div>
    </>
  );
};
