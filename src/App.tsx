import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/board';
import { Player } from './models/player';
import { Colors } from './models/colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

function App() {
  const [board, setBoard] = useState(new Board());

  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer)
  };

  return (
    <div className='App'>
      <Timer restart={restart} currentPlayer={currentPlayer} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className='lostBlock'>
        <LostFigures title='Black figures' figures={board.lostBlackFigures} />
        <LostFigures title='White figures' figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
