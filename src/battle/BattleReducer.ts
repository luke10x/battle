export interface Person {
  health: number;
  lastHit: number;
  dice1?: DiceRoll;
  dice2?: DiceRoll;
}

export interface Battle {
  player: Person;
  monster: Person;
  battleInProgress: boolean;
}

export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

export type BattleAction =
  | {
      actionType: 'DiceRolled';
      player1: DiceRoll;
      player2: DiceRoll;
      monster1: DiceRoll;
      monster2: DiceRoll;
    }
  | { actionType: 'Reset' };

const ensureBattleState = (optionalOldState: Battle | undefined) => {
  return optionalOldState === undefined
    ? {
        player: { health: 15, lastHit: 0 },
        monster: { health: 15, lastHit: 0 },
        battleInProgress: true,
      }
    : optionalOldState;
};

export const battleReducer = (optionalOldState: Battle | undefined, action: BattleAction): Battle => {
  const oldState = ensureBattleState(optionalOldState);

  if (action.actionType === 'Reset') {
    return ensureBattleState(undefined);
  }

  if (action.actionType === 'DiceRolled') {
    const playerScore = action.player1 + action.player2;
    const monsterScore = action.monster1 + action.monster2;
    const damage = Math.abs(playerScore - monsterScore);

    const monster =
      playerScore > monsterScore
        ? {
            health: Math.max(0, oldState.monster.health - damage),
            lastHit: damage,
            dice1: action.monster1,
            dice2: action.monster2,
          }
        : {
            ...oldState.monster,
            lastHit: 0,
            dice1: action.monster1,
            dice2: action.monster2,
          };

    const player =
      playerScore < monsterScore
        ? {
            health: Math.max(0, oldState.player.health - damage),
            lastHit: damage,
            dice1: action.player1,
            dice2: action.player2,
          }
        : {
            ...oldState.player,
            lastHit: 0,
            dice1: action.player1,
            dice2: action.player2,
          };

    const battleInProgress = player.health > 0 && monster.health > 0;

    return { player, monster, battleInProgress };
  }

  return oldState;
};
