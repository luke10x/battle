import React, { useState } from 'react';
import { Battle } from '../state';
import { setTimeoutWrapper } from '../edge/SetTimeout';
import { Player } from './Player';
import { StyledBoard } from './Styled';

interface BoardProps {
  battle: Battle;
  onRoll: () => void;
  onReset: () => void;
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const { battle, onRoll, onReset } = props;
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    setRolling(true);
    setTimeoutWrapper(() => {
      setRolling(false);
      onRoll();
    }, 1000);
  };

  const handleReset = () => {
    onReset();
  };

  const rollButton = battle.inProgress;
  const resetButton = !battle.inProgress;
  const won = battle.monster.health === 0;
  const lost = battle.human.health === 0;
  return (
    <StyledBoard>
      <div className="content">
        <Player title="HUMAN" rolling={rolling} fighter={battle.human} />
        <Player title="MONSTER" rolling={rolling} fighter={battle.monster} />
      </div>
      <div className="footer">
        {resetButton && <button onClick={handleReset}>Reset</button>}
        {won && <div className="banner won">HUMAN WON</div>}
        {lost && <div className="banner lost">MONSTER WON</div>}
        {rollButton && (
          <button
            className={rolling ? 'disabled' : ''}
            onClick={rolling ? undefined : handleRoll}
          >
            Roll!
          </button>
        )}
      </div>
    </StyledBoard>
  );
};
