import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from '../models/player';
import { Colors } from '../models/colors';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [WhiteTime, setWhiteTime] = useState(300);
  const [gameOver, setGameOver] = useState(false);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
    if (blackTime < 0) {
      setGameOver(true);
    }
    if (WhiteTime < 0) {
      setGameOver(true);
    }
  }, [currentPlayer, blackTime, WhiteTime]);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE ? decrementWhiteTime : decrementBlackTime;
    timer.current = setInterval(callback, 1000);
  };
  const decrementWhiteTime = () => {
    setWhiteTime((prev) => prev - 1);
  };
  const decrementBlackTime = () => {
    setBlackTime((prev) => prev - 1);
  };

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };
  return (
    <div className='timer'>
      <div>
        <button className='restartButton' onClick={handleRestart}>
          Restart
        </button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {WhiteTime}</h2>
    </div>
  );
};

export default Timer;
