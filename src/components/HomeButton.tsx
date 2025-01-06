import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/scss/home-button.scss';
import { Link } from 'react-router';

export const HomeButton = () => {
  return (
    <>
      <Link to={'/'} style={{ color: 'black' }}>
        <span className="home-button fade-in-home-button">
          <FaArrowLeft /> Home
        </span>
      </Link>
    </>
  );
};
