import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../styles/scss/footer.scss';

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <span>Made with TypeScript and React</span>
        <span>
          By Pedro Boni <FaGithub size={24} />
        </span>
      </div>
    </>
  );
};
