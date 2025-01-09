import React, { useState } from 'react';
import { handleMouseOver } from '../utils/functions/handleMouseOver';
import { useNavigate } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

export const D = ({ onClick }: { onClick: () => void }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleClick = () => {
    onClick(); // Trigger the move-left animation
    setTimeout(() => {
      navigate('/dip'); // Navigate to the desired route after 3 seconds
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
        D
      </span>
      <div
        className={`principle-name ${theme}`}
        style={{ display: isHover ? 'inline-block' : 'none' }}
      >
        <span style={{ fontSize: '18px' }}>Dependency Inversion Principle</span>
      </div>
    </>
  );
};
