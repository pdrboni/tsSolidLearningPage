import React, { useEffect, useState } from 'react';
import '../styles/scss/dark-mode-button.scss';

export const DarkModeButton: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => localStorage.getItem('darkMode') === 'true',
  );

  useEffect(() => {
    const labels = document.querySelectorAll('label');
    const animatedTexts = document.querySelectorAll('.animated-text');
    const principleNames = document.querySelectorAll('.principle-name');
    const homeButtons = document.querySelectorAll('.home-button');
    const footers = document.querySelectorAll('.footer');

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      labels.forEach((label) => {
        label.classList.add('dark-mode');
      });
      animatedTexts.forEach((animatedText) => {
        animatedText.classList.add('dark-mode');
      });
      principleNames.forEach((principleName) => {
        principleName.classList.add('dark-mode');
      });
      homeButtons.forEach((homeButton) => {
        homeButton.classList.add('dark-mode');
      });
      footers.forEach((footer) => {
        footer.classList.add('dark-mode');
      });
    } else {
      document.body.classList.remove('dark-mode');
      labels.forEach((label) => {
        label.classList.remove('dark-mode');
      });
      animatedTexts.forEach((animatedText) => {
        animatedText.classList.remove('dark-mode');
      });
      principleNames.forEach((principleName) => {
        principleName.classList.remove('dark-mode');
      });
      homeButtons.forEach((homeButton) => {
        homeButton.classList.remove('dark-mode');
      });
      footers.forEach((footer) => {
        footer.classList.remove('dark-mode');
      });
    }
    // Save preference in localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="form-check form-switch dark-mode-button">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        Dark Mode
      </label>
    </div>
  );
};
