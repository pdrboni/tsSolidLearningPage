import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/scss/home-button.scss';
import { Link } from 'react-router';

export const HomeButton = () => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => localStorage.getItem('darkMode') === 'true',
  );

  return (
    <>
      <Link to={'/'}>
        <span
          className={`home-button ${isDarkMode ? 'dark-mode' : ''} fade-in-home-button`}
        >
          <FaArrowLeft /> Home
        </span>
      </Link>
    </>
  );
};
