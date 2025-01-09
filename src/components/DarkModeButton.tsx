import React from 'react';
import '../styles/scss/dark-mode-button.scss';
import { useTheme } from '../contexts/ThemeContext';

export const DarkModeButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const toggleDarkMode = () => {
    toggleTheme();
  };

  return (
    <div className="form-check form-switch dark-mode-button">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        checked={theme === 'dark-mode'}
        onChange={toggleDarkMode}
      />
      <label
        className={`form-check-label ${theme}`}
        htmlFor="flexSwitchCheckDefault"
      >
        Dark Mode
      </label>
    </div>
  );
};
