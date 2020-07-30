export interface Person {
  health: number;
  lastHit: number;
}

export interface Battle {
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

  if (action.actionType === 'DiceRolled') {
    const playerScore = action.player1 + action.player2;
    const monsterScore = action.monster1 + action.monster2;
    const damage = Math.abs(playerScore - monsterScore);

    const monster =
      playerScore > monsterScore
        ? {
            health: oldState.monster.health - damage,
            lastHit: damage,
          }
        : oldState.monster;

    const player =
      playerScore < monsterScore
        ? {
            health: oldState.player.health - damage,
            lastHit: damage,
          }
        : oldState.player;

    const battleInProgress = player.health > 0 && monster.health > 0;

    return {
      player,
      monster,
      battleInProgress,
    };
  }

  return oldState;
};
