import React, { useReducer, useEffect, useState } from 'react';

import { battleReducer, BattleAction, DiceRoll } from './BattleReducer';

import { DiceComponent } from './DiceComponent';

const getRandom = (): DiceRoll => {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
};

export const BattleComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [state, dispatch] = useReducer(battleReducer, undefined);
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    console.log('roll', state);
    setRolling(true);

    setTimeout(() => {
      const action: BattleAction = {
        actionType: 'DiceRolled',
        player1: getRandom(),
        player2: getRandom(),
        monster1: getRandom(),
        monster2: getRandom(),
      };
      setRolling(false);
      dispatch(action);
    }, 1000);
  };

  useEffect(() => {
    if (!state) {
      dispatch({ actionType: 'Reset' });
    }
  });
  return (
    <div>
      {state && (
        <div>
          <div>
            PLAYER {state.player.health} -{state.player.lastHit}
            <div>
              <DiceComponent rolling={rolling} value={state.player.dice1} />
              <DiceComponent rolling={rolling} value={state.player.dice2} />
            </div>
          </div>
          <div>
            MONSTER {state.monster.health} -{state.monster.lastHit}
            <div>
              <DiceComponent rolling={rolling} value={state.monster.dice1} />
              <DiceComponent rolling={rolling} value={state.monster.dice2} />
            </div>
          </div>
        </div>
      )}
      {rolling || <button onClick={handleRoll}>Roll!!</button>}
    </div>
  );
};
