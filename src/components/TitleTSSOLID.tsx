import React from 'react';
import { S } from './S';
import { O } from './O';
import { L } from './L';
import { I } from './I';
import { D } from './D';

export const TitleTSSOLID = () => {
  return (
    <div className="flex-center">
      <div className="animated-text">
        <S />
        <O />
        <L />
        <I />
        <D />
      </div>
    </div>
  );
};
