export interface Person {
  health: number;
  lastHit: number;
  dice1?: DiceRoll;
  dice2?: DiceRoll;
}

export interface Battle {
  human: Person;
  monster: Person;
  battleInProgress: boolean;
}

export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

export type BattleAction =
  | {
      actionType: 'DiceRolled';
      human1: DiceRoll;
      human2: DiceRoll;
      monster1: DiceRoll;
      monster2: DiceRoll;
    }
  | { actionType: 'Reset' };

export const initialBattleState = {
  human: { health: 10, lastHit: 0 },
  monster: { health: 10, lastHit: 0 },
  battleInProgress: true,
};

export const battleReducer = (oldState: Battle, action: BattleAction): Battle => {
  if (action.actionType === 'Reset') {
    return initialBattleState;
  }

  if (action.actionType === 'DiceRolled') {
    const humanScore = action.human1 + action.human2;
    const monsterScore = action.monster1 + action.monster2;
    const damage = Math.abs(humanScore - monsterScore);

    const monster =
      humanScore > monsterScore
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

    const human =
      humanScore < monsterScore
        ? {
            health: Math.max(0, oldState.human.health - damage),
            lastHit: damage,
            dice1: action.human1,
            dice2: action.human2,
          }
        : {
            ...oldState.human,
            lastHit: 0,
            dice1: action.human1,
            dice2: action.human2,
          };

    const battleInProgress = human.health > 0 && monster.health > 0;

    return { human, monster, battleInProgress };
  }

  return oldState;
};
