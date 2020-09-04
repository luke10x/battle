export type Dice = 1 | 2 | 3 | 4 | 5 | 6;

export type DiceSet = [Dice, Dice];

export interface Player {
  health: number;
  lastRoll?: DiceSet;
  lastHit: number;
}

export interface Battle {
  human: Player;
  monster: Player;
  battleInProgress: boolean;
}

export type Action =
  | {
      actionType: 'DiceRolled';
      human: DiceSet;
      monster: DiceSet;
    }
  | { actionType: 'Reset' };

export const initialBattleState = {
  human: { health: 10, lastHit: 0 },
  monster: { health: 10, lastHit: 0 },
  battleInProgress: true,
};

export const battleReducer = (oldState: Battle, action: Action): Battle => {
  if (action.actionType === 'Reset') {
    return initialBattleState;
  }

  if (action.actionType === 'DiceRolled') {
    const humanScore = action.human[0] + action.human[1];
    const monsterScore = action.monster[0] + action.monster[1];
    const damage = Math.abs(humanScore - monsterScore);

    const monster =
      humanScore > monsterScore
        ? {
            health: Math.max(0, oldState.monster.health - damage),
            lastHit: damage,
            lastRoll: action.monster,
          }
        : {
            ...oldState.monster,
            lastHit: 0,
            lastRoll: action.monster,
          };

    const human =
      humanScore < monsterScore
        ? {
            health: Math.max(0, oldState.human.health - damage),
            lastHit: damage,
            lastRoll: action.human,
          }
        : {
            ...oldState.human,
            lastHit: 0,
            lastRoll: action.human,
          };

    const battleInProgress = human.health > 0 && monster.health > 0;

    return { human, monster, battleInProgress };
  }

  return oldState;
};
