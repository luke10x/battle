import { Battle } from '../state';
import { render } from '@testing-library/react';
import { Game } from './Game';
import React from 'react';

import { useBattleReducer } from '../state';
jest.mock('../state');

import { Board } from './Board';
jest.mock('./Board');

describe('board & battle state', () => {
  (Board as jest.Mock).mockReturnValue(<>BOARD</>);

  const initialBattle: Battle = {
    monster: { health: 10, lastHit: 0 },
    human: { health: 10, lastHit: 0 },
    inProgress: true,
  };

  const specificState: Battle = {
    monster: { health: 5, lastHit: 5 },
    human: { health: 5, lastHit: 0 },
    inProgress: true,
  };

  test.each([
    ['initial', initialBattle],
    ['specific', specificState],
  ])(
    'board is rendered with %p battle state',
    (_testCase: string, battle: Battle) => {
      (useBattleReducer as jest.Mock).mockReturnValueOnce([battle]);

      render(<Game />);

      expect(Board).toBeCalledWith(
        {
          battle: battle,
          onRoll: expect.anything(),
          onReset: expect.anything(),
        },
        expect.anything(),
      );
    },
  );
});
