import each from 'jest-each';

import { battleReducer, BattleAction, Person } from './BattleReducer';

describe('Each roll may cost some health', () => {
  describe('When they roll equal', () => {
    const diceRolledAction: BattleAction = {
      actionType: 'DiceRolled',
      player1: 6,
      player2: 5,
      monster1: 3,
      monster2: 2,
    };
    const stateAfterEqualRoll = battleReducer(undefined, diceRolledAction);

    test('player health stays the same', () => {
      expect(stateAfterEqualRoll.player).toEqual({ health: 100, lastHit: 0 });
    });

    test('monster health stays the same', () => {
      expect(stateAfterEqualRoll.player).toEqual({ health: 100, lastHit: 0 });
    });
  });

  describe('When monster rolls higher than player (%#', () => {
    const diceRolledAction: BattleAction = {
      actionType: 'DiceRolled',
      player1: 1,
      player2: 1,
      monster1: 5,
      monster2: 5,
    };
    each([
      [diceRolledAction, { health: 92, lastHit: 8 }],
      [
        {
          actionType: 'DiceRolled',
          player1: 4,
          player2: 5,
          monster1: 5,
          monster2: 5,
        },
        { health: 99, lastHit: 1 },
      ],
    ]).test('Player health is hit', (diceRolledAction: BattleAction, result: Person) => {
      const stateAfterFirstRoll = battleReducer(undefined, diceRolledAction);

      expect(stateAfterFirstRoll.player).toEqual(result);
    });

    test('Monster health stays same', () => {
      const stateAfterFirstRoll = battleReducer(undefined, diceRolledAction);

      expect(stateAfterFirstRoll.monster).toEqual({ health: 100, lastHit: 0 });
    });
  });

  describe('When player rolls higher than monster', () => {
    const diceRolledAction: BattleAction = {
      actionType: 'DiceRolled',
      player1: 6,
      player2: 5,
      monster1: 3,
      monster2: 2,
    };
    const stateAfterFirstRoll = battleReducer(undefined, diceRolledAction);

    test('player health stays the same', () => {
      expect(stateAfterFirstRoll.player).toEqual({ health: 100, lastHit: 0 });
    });
    test('monster health is hit', () => {
      expect(stateAfterFirstRoll.monster).toEqual({ health: 94, lastHit: 6 });
    });

    describe('When player rolls higher than monster again (this time much higher)', () => {
      const diceRolledAction: BattleAction = {
        actionType: 'DiceRolled',
        player1: 6,
        player2: 6,
        monster1: 1,
        monster2: 1,
      };

      const stateAfterSecondRoll = battleReducer(stateAfterFirstRoll, diceRolledAction);

      test('player health stays the same still', () => {
        expect(stateAfterSecondRoll.player).toEqual({ health: 100, lastHit: 0 });
      });
      test('monster health is hit even more', () => {
        expect(stateAfterSecondRoll.monster).toEqual({ health: 84, lastHit: 10 });
      });
    });
    describe('Revenge: When monster rolls higher than player', () => {
      const diceRolledAction: BattleAction = {
        actionType: 'DiceRolled',
        player1: 1,
        player2: 1,
        monster1: 3,
        monster2: 2,
      };
      const stateAfterSecondRoll = battleReducer(stateAfterFirstRoll, diceRolledAction);
      test('player health is hit this time', () => {
        expect(stateAfterSecondRoll.player).toEqual({ health: 97, lastHit: 3 });
      });

      test('monster health stays the same, since it was hit last time', () => {
        expect(stateAfterSecondRoll.monster).toEqual({ health: 94, lastHit: 6 });
      });
    });
  });
});
