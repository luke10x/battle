import React, { useReducer } from 'react';
import { battleReducer, Action, Face, Battle, initialState } from '../state';
import { Board } from './Board';

const getRandom = (): Face => {
  return (Math.floor(Math.random() * 6) + 1) as Face;
};

export const Game: React.FC = () => {
  const [battle, dispatch] = useReducer<React.Reducer<Battle, Action>>(
    battleReducer,
    initialState,
  );

  const handleRoll = () => {
    const action: Action = {
      actionType: 'DiceRolled',
      human: [getRandom(), getRandom()],
      monster: [getRandom(), getRandom()],
    };
    dispatch(action);
  };

  const handleReset = () => {
    dispatch({ actionType: 'Reset' });
  };

  return <Board battle={battle} onRoll={handleRoll} onReset={handleReset} />;
};
