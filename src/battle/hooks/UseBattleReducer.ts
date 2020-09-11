import React, { useReducer } from 'react';
import { battleReducer, initialState, Battle, Action } from '../state';

export const useBattleReducer = (): [Battle, React.Dispatch<Action>] => {
  return useReducer<React.Reducer<Battle, Action>>(battleReducer, initialState);
};
