import { Battle } from '../state';
import { render } from '@testing-library/react';
import { Game } from './Game';
import React from 'react';

import { useBattleReducer } from '../hooks/UseBattleReducer';
jest.mock('../hooks/UseBattleReducer');

import { Board } from './Board';
jest.mock('./Board');

import { generateRandom } from '../utils/GenerateRandom';
jest.mock('../utils/GenerateRandom');

describe('battle states', () => {
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

  describe('board just returns DOM', () => {
    beforeEach(() => {
      (Board as jest.Mock).mockReturnValue(<>BOARD</>);
    });
    afterEach(() => jest.resetAllMocks());

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

    test('no action is dispatched', () => {
      const dispatch = jest.fn();
      (useBattleReducer as jest.Mock).mockReturnValueOnce([
        initialBattle,
        dispatch,
      ]);

      render(<Game />);
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('board triggers its onReset property', () => {
    beforeEach(() => {
      (Board as jest.Mock).mockImplementation((props) => {
        const { onReset } = props;
        onReset();
        return <>BOARD</>;
      });
    });
    afterEach(() => jest.resetAllMocks());

    test('dispatches "Reset" action', () => {
      const dispatch = jest.fn();
      (useBattleReducer as jest.Mock).mockReturnValueOnce([
        initialBattle,
        dispatch,
      ]);

      render(<Game />);
      expect(dispatch).toHaveBeenCalledWith({ actionType: 'Reset' });
    });
  });

  describe('board triggers its onRoll property', () => {
    beforeEach(() => {
      (Board as jest.Mock).mockImplementation((props) => {
        const { onRoll } = props;
        onRoll();
        return <>BOARD</>;
      });
    });
    afterEach(() => jest.resetAllMocks());

    test('dispatches "DiceRolled" action', () => {
      const dispatch = jest.fn();
      (useBattleReducer as jest.Mock).mockReturnValueOnce([
        initialBattle,
        dispatch,
      ]);

      (generateRandom as jest.Mock)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(4);

      render(<Game />);
      expect(dispatch).toHaveBeenCalledWith({
        actionType: 'DiceRolled',
        human: [1, 2],
        monster: [3, 4],
      });
    });
  });
});
