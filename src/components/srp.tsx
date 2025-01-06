import React, { useEffect, useState } from 'react';

export const SRP = () => {
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);

  const handleFadeOutSpinner = (): void => {
    setTimeout(() => {
      setFadeOutSpinner(true);
    }, 1500); // 3000ms = 3 seconds
  };

  useEffect(() => {
    handleFadeOutSpinner();
  }, []);

  return (
    <>
      <div
        className={`flex-center ${fadeOutSpinner ? 'fade-out' : 'reset-animation'}`}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ width: '3rem', height: '3rem', borderWidth: '0.6rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div
        className={`${fadeOutSpinner ? 'fade-in flex-center' : 'visually-hidden'}`}
      >
        SRP
      </div>
    </>
  );
};
