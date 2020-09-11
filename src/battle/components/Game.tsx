import React from 'react';
import { useBattleReducer } from '../hooks/UseBattleReducer';
import { generateRandom } from '../utils/GenerateRandom';
import { Action } from '../state';
import { Board } from './Board';

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
