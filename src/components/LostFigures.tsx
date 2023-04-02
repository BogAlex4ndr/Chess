import React, { FC } from 'react';
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className='lost'>
      <div>
        <h3>{title}</h3>
      </div>
      {figures.map((figure) => (
        <div key={figure.id}>{figure.logo && <img src={figure.logo} />}</div>
      ))}
    </div>
  );
};

export default LostFigures;
