import React, { useEffect, useState } from 'react';

import { Face } from '../state';

interface DieProps {
  rolling: boolean;
  lastRolled: Face | undefined;
}

export const numberToDiceRoll = (num: number): Face => {
  if (1 < num || num < 6) {
    return num as Face;
  }

  throw new Error('Number is out of range for DiceRoll');
};

const faceToChar = (face: Face | undefined) => {
  if (!face) {
    return '';
  }

  const CHAR_BEFORE_DICE = 9855;
  return String.fromCharCode(CHAR_BEFORE_DICE + face);
};

export const Die: React.FC<DieProps> = (props: DieProps) => {
  const [rollingFace, setRollingFace] = useState<Face>(1);
  useEffect(() => {
    if (props.rolling) {
      setTimeout(() => {
        setRollingFace(numberToDiceRoll((rollingFace % 6) + 1));
      }, 100);
    }
  }, [rollingFace, props.rolling]);

  if (props.rolling) {
    return <span>{faceToChar(rollingFace)}</span>;
  }
  if (props.lastRolled === undefined) {
    return <span></span>;
  }
  return <span>{faceToChar(props.lastRolled)}</span>;
};
