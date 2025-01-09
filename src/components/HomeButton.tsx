import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/scss/home-button.scss';
import { Link } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

export const HomeButton = () => {
  const { theme } = useTheme();

  return (
    <>
      <Link to={'/'}>
        <span className={`home-button ${theme} fade-in-home-button`}>
          <FaArrowLeft /> Home
        </span>
      </Link>
    </>
  );
};
