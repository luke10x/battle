import { DiceRoll } from './BattleReducer';
import { useEffect, useState } from 'react';
import React from 'react';

interface DiceComponentProps {
  rolling: boolean;
  lastRolled: DiceRoll | undefined;
}

export const numberToDiceRoll = (num: number): DiceRoll => {
  if (1 < num || num < 6) {
    return num as DiceRoll;
  }

  throw new Error('Number is out of range for DiceRoll');
};

const getDiceChar = (diceRoll: DiceRoll) => {
  if (!diceRoll) {
    return '';
  }

  const CHAR_BEFORE_DICE = 9855;
  return String.fromCharCode(CHAR_BEFORE_DICE + diceRoll);
};

export const DiceComponent: React.FC<DiceComponentProps> = (props: DiceComponentProps) => {
  const [dice, setDice] = useState<DiceRoll>(1);
  useEffect(() => {
    if (props.rolling) {
      setTimeout(() => {
        setDice(numberToDiceRoll((dice % 6) + 1));
      }, 100);
    }
  }, [dice, props.rolling]);

  if (props.rolling) {
    return <span>{getDiceChar(dice)}</span>;
  }
  if (props.lastRolled === undefined) {
    return <span> </span>;
  }
  return <span>{getDiceChar(props.lastRolled)}</span>;
};
