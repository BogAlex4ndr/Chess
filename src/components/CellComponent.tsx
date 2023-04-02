import React, { FC } from 'react';
import { Cell } from '../models/cell';

interface cellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<cellProps> = ({ cell, selected, click }) => {
  return (
    <div
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? 'green' : '' }}
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}>
      {cell.available && !cell.figure && <div className='available'></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt='figure' />}
    </div>
  );
};

export default CellComponent;
