import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../styles/scss/footer.scss';
import { useTheme } from '../contexts/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className={`footer ${theme}`}>
        <span>Made with TypeScript and React</span>
        <span>
          By Pedro Boni <FaGithub size={24} />
        </span>
      </div>
    </>
  );
};
