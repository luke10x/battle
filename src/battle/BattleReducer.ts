interface Person {
  health: number;
  lastHit: number;
}

interface Battle {
  player: Person;
  monster: Person;
  battleInProgress: boolean;
}

type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

export type BattleAction =
  | {
      actionType: 'DiceRolled';
      player1: DiceRoll;
      player2: DiceRoll;
      monster1: DiceRoll;
      monster2: DiceRoll;
    }
  | { actionType: 'Reset' };

const ensureOldState = (optionalOldState: Battle | undefined) => {
  return optionalOldState === undefined
    ? {
        player: { health: 100, lastHit: 0 },
        monster: { health: 100, lastHit: 0 },
        battleInProgress: true,
      }
    : optionalOldState;
};

export const battleReducer = (optionalOldState: Battle | undefined, action: BattleAction): Battle => {
  const oldState = ensureOldState(optionalOldState);
  action; // TODO use me

  const newState = {
    ...oldState,
    monster: { health: 95, lastHit: 5 },
  };

  return newState;
};
