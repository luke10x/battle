import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Fighter } from '../state';

interface DamageProps {
  fighter: Fighter;
}

const rotate = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Styled = styled.span`
  color: red;
  opacity: 0;
  animation: ${rotate} 0.8s linear;
`;

export const Damage: React.FC<DamageProps> = (props: DamageProps) => {
  if (props.fighter.lastHit === 0) {
    return <></>;
  }

  return <Styled key={props.fighter.health}>-{props.fighter.lastHit}</Styled>;
};
