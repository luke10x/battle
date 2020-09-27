import { handleAction, Action, initialState } from './ActionHandler';
import { Battle } from './Battle';

describe('Each roll may cost some health', () => {
  describe('When they roll equal', () => {
    const diceRolledAction: Action = {
      actionType: 'DiceRolled',
      human: [6, 5],
      monster: [3, 2],
    };
    const stateAfterEqualRoll = handleAction(initialState, diceRolledAction);

    test('human health stays the same', () => {
      expect(stateAfterEqualRoll.human.health).toEqual(10);
      expect(stateAfterEqualRoll.human.lastHit).toEqual(0);
    });

    test('monster health stays the same', () => {
      expect(stateAfterEqualRoll.human.health).toEqual(10);
      expect(stateAfterEqualRoll.human.lastHit).toEqual(0);
    });
  });

  describe('When monster rolls higher than human (%#', () => {
    const diceRolledAction: Action = {
      actionType: 'DiceRolled',
      human: [1, 1],
      monster: [5, 5],
    };

    test.each([
      [diceRolledAction, 2, 8],
      [
        {
          actionType: 'DiceRolled',
          human: [4, 5],
          monster: [5, 5],
        },
        9,
        1,
      ],
    ])(
      'human health is hit',
      (diceRolledAction, expectedHealth, expectedLastHit) => {
        const stateAfterFirstRoll = handleAction(
          initialState,
          diceRolledAction as Action,
        );

        expect(stateAfterFirstRoll.human.health).toEqual(expectedHealth);
        expect(stateAfterFirstRoll.human.lastHit).toEqual(expectedLastHit);
      },
    );

    test('Monster health stays same', () => {
      const stateAfterFirstRoll = handleAction(initialState, diceRolledAction);

      expect(stateAfterFirstRoll.monster.health).toEqual(10);
      expect(stateAfterFirstRoll.monster.lastHit).toEqual(0);
    });
  });

  describe('When human rolls higher than monster', () => {
    const diceRolledAction: Action = {
      actionType: 'DiceRolled',
      human: [6, 5],
      monster: [5, 4],
    };
    const stateAfterFirstRoll = handleAction(initialState, diceRolledAction);

    test('human health stays the same', () => {
      expect(stateAfterFirstRoll.human.health).toEqual(10);
      expect(stateAfterFirstRoll.human.lastHit).toEqual(0);
    });
    test('monster health is hit', () => {
      expect(stateAfterFirstRoll.monster.health).toEqual(8);
      expect(stateAfterFirstRoll.monster.lastHit).toEqual(2);
    });

    describe('When human rolls higher than monster again (this time much higher)', () => {
      const diceRolledAction: Action = {
        actionType: 'DiceRolled',
        human: [6, 6],
        monster: [3, 3],
      };

      const stateAfterSecondRoll = handleAction(
        stateAfterFirstRoll,
        diceRolledAction,
      );

      test('human health stays the same still', () => {
        expect(stateAfterSecondRoll.human.health).toEqual(10);
        expect(stateAfterSecondRoll.human.lastHit).toEqual(0);
      });
      test('monster health is hit even more', () => {
        expect(stateAfterSecondRoll.monster.health).toEqual(2);
        expect(stateAfterSecondRoll.monster.lastHit).toEqual(6);
      });
    });
    describe('Revenge: When monster rolls higher than human', () => {
      const diceRolledAction: Action = {
        actionType: 'DiceRolled',
        human: [1, 1],
        monster: [3, 2],
      };
      const stateAfterSecondRoll = handleAction(
        stateAfterFirstRoll,
        diceRolledAction,
      );
      test('human health is hit this time', () => {
        expect(stateAfterSecondRoll.human.health).toEqual(7);
        expect(stateAfterSecondRoll.human.lastHit).toEqual(3);
      });

      test('monster health stays the same, since it was hit last time', () => {
        expect(stateAfterSecondRoll.monster.health).toEqual(8);
        expect(stateAfterSecondRoll.monster.lastHit).toEqual(0);
      });
    });
  });
});

describe('Detects when game is ended', () => {
  describe('after nine small wins', () => {
    const actions: Action[] = Array(9).fill({
      actionType: 'DiceRolled',
      human: [6, 6],
      monster: [6, 5],
    });

    const finalState = actions.reduce<Battle>(handleAction, initialState);

    expect(finalState?.inProgress).toBeTruthy();
  });
  describe('after ten big wins', () => {
    const actions: Action[] = Array(10).fill({
      actionType: 'DiceRolled',
      human: [6, 6],
      monster: [1, 1],
    });

    const finalState = actions.reduce<Battle>(handleAction, initialState);

    expect(finalState?.inProgress).toBeFalsy();
  });
});

describe('Resets battle state', () => {
  const actions: Action[] = [
    { actionType: 'DiceRolled', human: [6, 6], monster: [1, 1] },
    { actionType: 'Reset' },
  ];

  const finalState = actions.reduce<Battle>(handleAction, initialState);

  test('It is back to initial state', () => {
    expect(finalState?.inProgress).toBeTruthy();
    expect(finalState?.human.health).toBe(10);
    expect(finalState?.monster.health).toBe(10);
  });
});

describe('Cannot go lower than zero health', () => {
  const actions: Action[] = Array(12).fill({
    actionType: 'DiceRolled',
    human: [6, 5],
    monster: [1, 1],
  });

  const finalState = actions.reduce<Battle>(handleAction, initialState);

  test('Monster health stays at least zero', () => {
    expect(finalState?.monster.health).toBe(0);
  });
});

describe('Stores last rolled dice in the state', () => {
  const action: Action = {
    actionType: 'DiceRolled',
    human: [1, 2],
    monster: [3, 4],
  };

  const finalState = handleAction(initialState, action);

  test('Persons keep rolled dice', () => {
    expect(finalState.human.lastRoll?.[0]).toBe(1);
    expect(finalState.human.lastRoll?.[1]).toBe(2);
    expect(finalState.monster.lastRoll?.[0]).toBe(3);
    expect(finalState.monster.lastRoll?.[1]).toBe(4);
  });
});

describe('Forgets last hit on next roll', () => {
  const state: Battle = {
    human: { health: 90, lastHit: 10 },
    monster: { health: 100, lastHit: 0 },
    inProgress: true,
  };
  const action: Action = {
    actionType: 'DiceRolled',
    human: [6, 6],
    monster: [3, 4],
  };

  const finalState = handleAction(state, action);

  test('human forgets its last hit', () => {
    expect(finalState.human.lastHit).toBe(0);
  });
});
