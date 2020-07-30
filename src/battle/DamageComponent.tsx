import React from 'react';

import styled, { keyframes } from 'styled-components';

interface DamageComponentProps {
  value: number;
  rolling: boolean;
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
  if (props.value === 0 || props.rolling) {
    return <></>;
  }

  return <StyledSpan>-{props.value}</StyledSpan>;
};
