import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../styles/scss/footer.scss';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className={`footer ${theme}`}>
        <span>Made with TypeScript and React</span>
        <span>
          By Pedro Boni{' '}
          <Link
            to={'https://github.com/pdrboni/tsSolidLearningPage'}
            target="blank"
          >
            <FaGithub size={24} className={`github-link ${theme}`} />
          </Link>
        </span>
      </div>
    </>
  );
};
