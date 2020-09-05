import React, { useEffect, useState } from 'react';
import { Face } from '../state';
import { setTimeoutWrapper } from '../util/SetTimeout';

interface DieProps {
  rolling: boolean;
  lastRolled: Face | undefined;
}

const numberToFace = (num: number): Face => {
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
      setTimeoutWrapper(() => {
        setRollingFace(numberToFace((rollingFace % 6) + 1));
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
