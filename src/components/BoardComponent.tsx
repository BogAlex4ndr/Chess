import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/board';
import { Cell } from '../models/cell';
import CellComponent from './CellComponent';
import { Player } from '../models/player';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}
const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };
  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const numbersArr = [8, 7, 6, 5, 4, 3, 2, 1];
  const lettersArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return (
    <div>
      <h3> {currentPlayer?.color.toUpperCase()} Move</h3>
      <div style={{ display: 'flex' }}>
        <div className='numbersArr'>
          {numbersArr.map((num, index) => (
            <div className='numbers' key={index}>
              {num}
            </div>
          ))}
        </div>
        <div className='board'>
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='letterArr'>
        {lettersArr.map((leter, index) => (
          <div className='letters' key={index}>
            {leter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
