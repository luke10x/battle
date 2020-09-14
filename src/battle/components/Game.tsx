import React from 'react';

import { Board } from './Board';
import { Action } from '../state';
import { useBattleReducer } from '../hooks/UseBattleReducer';
import { generateRandom } from '../utils/Random';

export const Game: React.FC = () => {
  const [battle, dispatch] = useBattleReducer();

  const handleRoll = () => {
    const action: Action = {
      actionType: 'DiceRolled',
      human: [generateRandom(), generateRandom()],
      monster: [generateRandom(), generateRandom()],
    };
    dispatch(action);
  };

  const handleReset = () => {
    dispatch({ actionType: 'Reset' });
  };

  return <Board battle={battle} onRoll={handleRoll} onReset={handleReset} />;
};
