import React, { useReducer } from 'react';
import { battleReducer, initialState, Action } from './BattleReducer';
import { Battle } from './Battle';

export const useBattleReducer = (): [Battle, React.Dispatch<Action>] => {
  return useReducer<React.Reducer<Battle, Action>>(battleReducer, initialState);
};
