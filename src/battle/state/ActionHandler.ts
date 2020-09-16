import { Battle, Roll } from './Battle';

export type Action =
  | {
      actionType: 'DiceRolled';
      human: Roll;
      monster: Roll;
    }
  | { actionType: 'Reset' };

export const initialState = {
  human: { health: 10, lastHit: 0 },
  monster: { health: 10, lastHit: 0 },
  inProgress: true,
};

export const handleAction = (oldState: Battle, action: Action): Battle => {
  if (action.actionType === 'Reset') {
    return initialState;
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

    return { human, monster, inProgress: battleInProgress };
  }

  return oldState;
};
