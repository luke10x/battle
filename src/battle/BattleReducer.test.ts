import { battleReducer, BattleAction, Battle, initialBattleState } from './BattleReducer';

describe('Each roll may cost some health', () => {
  describe('When they roll equal', () => {
    const diceRolledAction: BattleAction = {
      actionType: 'DiceRolled',
      human1: 6,
      human2: 5,
      monster1: 3,
      monster2: 2,
    };
    const stateAfterEqualRoll = battleReducer(initialBattleState, diceRolledAction);

    test('human health stays the same', () => {
      expect(stateAfterEqualRoll.human.health).toEqual(100);
      expect(stateAfterEqualRoll.human.lastHit).toEqual(0);
    });

    test('monster health stays the same', () => {
      expect(stateAfterEqualRoll.human.health).toEqual(100);
      expect(stateAfterEqualRoll.human.lastHit).toEqual(0);
    });
  });

  describe('When monster rolls higher than human (%#', () => {
    const diceRolledAction: BattleAction = {
      actionType: 'DiceRolled',
      human1: 1,
      human2: 1,
      monster1: 5,
      monster2: 5,
    };

    test.each([
      [diceRolledAction, 92, 8],
      [
        {
          actionType: 'DiceRolled',
          human1: 4,
          human2: 5,
          monster1: 5,
          monster2: 5,
        },
        99,
        1,
      ],
    ])('human health is hit', (diceRolledAction, expectedHealth, expectedLastHit) => {
      const stateAfterFirstRoll = battleReducer(initialBattleState, diceRolledAction as BattleAction);

      expect(stateAfterFirstRoll.human.health).toEqual(expectedHealth);
      expect(stateAfterFirstRoll.human.lastHit).toEqual(expectedLastHit);
    });

    test('Monster health stays same', () => {
      const stateAfterFirstRoll = battleReducer(initialBattleState, diceRolledAction);

      expect(stateAfterFirstRoll.monster.health).toEqual(100);
      expect(stateAfterFirstRoll.monster.lastHit).toEqual(0);
    });
  });

  describe('When human rolls higher than monster', () => {
    const diceRolledAction: BattleAction = {
      actionType: 'DiceRolled',
      human1: 6,
      human2: 5,
      monster1: 3,
      monster2: 2,
    };
    const stateAfterFirstRoll = battleReducer(initialBattleState, diceRolledAction);

    test('human health stays the same', () => {
      expect(stateAfterFirstRoll.human.health).toEqual(100);
      expect(stateAfterFirstRoll.human.lastHit).toEqual(0);
    });
    test('monster health is hit', () => {
      expect(stateAfterFirstRoll.monster.health).toEqual(94);
      expect(stateAfterFirstRoll.monster.lastHit).toEqual(6);
    });

    describe('When human rolls higher than monster again (this time much higher)', () => {
      const diceRolledAction: BattleAction = {
        actionType: 'DiceRolled',
        human1: 6,
        human2: 6,
        monster1: 1,
        monster2: 1,
      };

      const stateAfterSecondRoll = battleReducer(stateAfterFirstRoll, diceRolledAction);

      test('human health stays the same still', () => {
        expect(stateAfterSecondRoll.human.health).toEqual(100);
        expect(stateAfterSecondRoll.human.lastHit).toEqual(0);
      });
      test('monster health is hit even more', () => {
        expect(stateAfterSecondRoll.monster.health).toEqual(84);
        expect(stateAfterSecondRoll.monster.lastHit).toEqual(10);
      });
    });
    describe('Revenge: When monster rolls higher than human', () => {
      const diceRolledAction: BattleAction = {
        actionType: 'DiceRolled',
        human1: 1,
        human2: 1,
        monster1: 3,
        monster2: 2,
      };
      const stateAfterSecondRoll = battleReducer(stateAfterFirstRoll, diceRolledAction);
      test('human health is hit this time', () => {
        expect(stateAfterSecondRoll.human.health).toEqual(97);
        expect(stateAfterSecondRoll.human.lastHit).toEqual(3);
      });

      test('monster health stays the same, since it was hit last time', () => {
        expect(stateAfterSecondRoll.monster.health).toEqual(94);
        expect(stateAfterSecondRoll.monster.lastHit).toEqual(0);
      });
    });
  });
});

describe('Detects when game is ended', () => {
  describe('after nine big wins', () => {
    const actions: BattleAction[] = Array(9).fill({
      actionType: 'DiceRolled',
      human1: 6,
      human2: 6,
      monster1: 1,
      monster2: 1,
    });

    const finalState = actions.reduce<Battle>(battleReducer, initialBattleState);

    expect(finalState?.battleInProgress).toBeTruthy();
  });
  describe('after ten big wins', () => {
    const actions: BattleAction[] = Array(10).fill({
      actionType: 'DiceRolled',
      human1: 6,
      human2: 6,
      monster1: 1,
      monster2: 1,
    });

    const finalState = actions.reduce<Battle>(battleReducer, initialBattleState);

    expect(finalState?.battleInProgress).toBeFalsy();
  });
});

describe('Resets battle state', () => {
  const actions: BattleAction[] = [
    { actionType: 'DiceRolled', human1: 6, human2: 6, monster1: 1, monster2: 1 },
    { actionType: 'Reset' },
  ];

  const finalState = actions.reduce<Battle>(battleReducer, initialBattleState);

  test('It is back to initial state', () => {
    expect(finalState?.battleInProgress).toBeTruthy();
    expect(finalState?.human.health).toBe(100);
    expect(finalState?.monster.health).toBe(100);
  });
});

describe('Cannot go lower than zero health', () => {
  const actions: BattleAction[] = Array(12).fill({
    actionType: 'DiceRolled',
    human1: 6,
    human2: 5,
    monster1: 1,
    monster2: 1,
  });

  const finalState = actions.reduce<Battle>(battleReducer, initialBattleState);

  test('Monster health stays at least zero', () => {
    expect(finalState?.monster.health).toBe(0);
  });
});

describe('Stores last rolled dice in the state', () => {
  const action: BattleAction = {
    actionType: 'DiceRolled',
    human1: 1,
    human2: 2,
    monster1: 3,
    monster2: 4,
  };

  const finalState = battleReducer(initialBattleState, action);

  test('Persons keep rolled dice', () => {
    expect(finalState.human.dice1).toBe(1);
    expect(finalState.human.dice2).toBe(2);
    expect(finalState.monster.dice1).toBe(3);
    expect(finalState.monster.dice2).toBe(4);
  });
});

describe('Forgets last hit on next roll', () => {
  const state: Battle = {
    human: { health: 90, lastHit: 10 },
    monster: { health: 100, lastHit: 0 },
    battleInProgress: true,
  };
  const action: BattleAction = {
    actionType: 'DiceRolled',
    human1: 6,
    human2: 6,
    monster1: 3,
    monster2: 4,
  };

  const finalState = battleReducer(state, action);

  test('human forgets its last hit', () => {
    expect(finalState.human.lastHit).toBe(0);
  });
});
