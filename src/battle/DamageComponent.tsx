import React from 'react';

import styled, { keyframes } from 'styled-components';
import { Person } from './BattleReducer';

interface DamageComponentProps {
  player: Person;
}

const rotate = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledSpan = styled.span`
  color: red;
  opacity: 0;
  animation: ${rotate} 0.8s linear;
`;

export const DamageComponent: React.FC<DamageComponentProps> = (props: DamageComponentProps) => {
  if (props.player.lastHit === 0) {
    return <></>;
  }

  return <StyledSpan key={props.player.health}>-{props.player.lastHit}</StyledSpan>;
};
