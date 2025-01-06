import React from 'react';

export const handleMouseOver = (
  fn: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  fn((prevState) => {
    const newState = !prevState; // Calculate the new state
    console.log(newState); // Log the updated state
    return newState; // Return the new state to update
  });
};
