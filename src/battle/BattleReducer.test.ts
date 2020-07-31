import { battleReducer, BattleAction, Battle } from './BattleReducer';

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
      expect(stateAfterEqualRoll.player.health).toEqual(100);
      expect(stateAfterEqualRoll.player.lastHit).toEqual(0);
    });

    test('monster health stays the same', () => {
      expect(stateAfterEqualRoll.player.health).toEqual(100);
      expect(stateAfterEqualRoll.player.lastHit).toEqual(0);
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

    test.each([
      [diceRolledAction, 92, 8],
      [
        {
          actionType: 'DiceRolled',
          player1: 4,
          player2: 5,
          monster1: 5,
          monster2: 5,
        },
        99,
        1,
      ],
    ])('Player health is hit', (diceRolledAction, expectedHealth, expectedLastHit) => {
      const stateAfterFirstRoll = battleReducer(undefined, diceRolledAction as BattleAction);

      expect(stateAfterFirstRoll.player.health).toEqual(expectedHealth);
      expect(stateAfterFirstRoll.player.lastHit).toEqual(expectedLastHit);
    });

    test('Monster health stays same', () => {
      const stateAfterFirstRoll = battleReducer(undefined, diceRolledAction);

      expect(stateAfterFirstRoll.monster.health).toEqual(100);
      expect(stateAfterFirstRoll.monster.lastHit).toEqual(0);
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
      expect(stateAfterFirstRoll.player.health).toEqual(100);
      expect(stateAfterFirstRoll.player.lastHit).toEqual(0);
    });
    test('monster health is hit', () => {
      expect(stateAfterFirstRoll.monster.health).toEqual(94);
      expect(stateAfterFirstRoll.monster.lastHit).toEqual(6);
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
        expect(stateAfterSecondRoll.player.health).toEqual(100);
        expect(stateAfterSecondRoll.player.lastHit).toEqual(0);
      });
      test('monster health is hit even more', () => {
        expect(stateAfterSecondRoll.monster.health).toEqual(84);
        expect(stateAfterSecondRoll.monster.lastHit).toEqual(10);
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
        expect(stateAfterSecondRoll.player.health).toEqual(97);
        expect(stateAfterSecondRoll.player.lastHit).toEqual(3);
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
      player1: 6,
      player2: 6,
      monster1: 1,
      monster2: 1,
    });

    // @ts-ignore
    const finalState = actions.reduce(battleReducer, undefined);

    expect(finalState?.battleInProgress).toBeTruthy();
  });
  describe('after ten big wins', () => {
    const actions: BattleAction[] = Array(10).fill({
      actionType: 'DiceRolled',
      player1: 6,
      player2: 6,
      monster1: 1,
      monster2: 1,
    });

    // @ts-ignore
    const finalState = actions.reduce(battleReducer, undefined);

    expect(finalState?.battleInProgress).toBeFalsy();
  });
});

describe('Resets battle state', () => {
  const actions: BattleAction[] = [
    { actionType: 'DiceRolled', player1: 6, player2: 6, monster1: 1, monster2: 1 },
    { actionType: 'Reset' },
  ];

  // @ts-ignore
  const finalState = actions.reduce(battleReducer, undefined);

  test('It is back to initial state', () => {
    expect(finalState?.battleInProgress).toBeTruthy();
    expect(finalState?.player.health).toBe(100);
    expect(finalState?.monster.health).toBe(100);
  });
});

describe('Cannot go lower than zero health', () => {
  const actions: BattleAction[] = Array(12).fill({
    actionType: 'DiceRolled',
    player1: 6,
    player2: 5,
    monster1: 1,
    monster2: 1,
  });

  // @ts-ignore
  const finalState = actions.reduce(battleReducer, undefined);

  test('Monster health stays at least zero', () => {
    expect(finalState?.monster.health).toBe(0);
  });
});

describe('Stores last rolled dice in the state', () => {
  const action: BattleAction = {
    actionType: 'DiceRolled',
    player1: 1,
    player2: 2,
    monster1: 3,
    monster2: 4,
  };

  const finalState = battleReducer(undefined, action);

  test('Persons keep rolled dice', () => {
    expect(finalState.player.dice1).toBe(1);
    expect(finalState.player.dice2).toBe(2);
    expect(finalState.monster.dice1).toBe(3);
    expect(finalState.monster.dice2).toBe(4);
  });
});

describe('Forgets last hit on next roll', () => {
  const state: Battle = {
    player: { health: 90, lastHit: 10 },
    monster: { health: 100, lastHit: 0 },
    battleInProgress: true,
  };
  const action: BattleAction = {
    actionType: 'DiceRolled',
    player1: 6,
    player2: 6,
    monster1: 3,
    monster2: 4,
  };

  const finalState = battleReducer(state, action);

  test('player forgets its last hit', () => {
    expect(finalState.player.lastHit).toBe(0);
  });
});
