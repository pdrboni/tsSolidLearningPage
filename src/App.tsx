import './styles.css';
import IMAGEPNG from '../images/react-logo-png.png';
import IMAGESVG from '../images/react-logo-svg.svg';
import { ClickCounter } from './ClickCounter';
import React from 'react';

export const App = () => {
  const num = 2;
  const num2 = 23;
  return (
    <>
      <h1>
        Ts SOLIDi - {process.env.NODE_ENV} {process.env.name}
      </h1>
      <img src={IMAGEPNG} alt="REACT LOGO PNG" />
      <img src={IMAGESVG} alt="REACT LOGO SVG" />
      <ClickCounter />
    </>
  );
};
