import { battleReducer, BattleAction } from './BattleReducer';

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
      expect(stateAfterFirstRoll.monster).toEqual({ health: 95, lastHit: 5 });
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
      test.todo('monster health is hit even more');
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

      test.todo('player health is hit this time');

      test('monster health stays the same, since it was hit last time', () => {
        expect(stateAfterSecondRoll.player).toEqual({ health: 100, lastHit: 0 });
      });
    });
  });
});
