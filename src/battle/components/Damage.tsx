import React from 'react';

import { StyledDamage } from './Styled';
import { Fighter } from '../state';

interface DamageProps {
  fighter: Fighter;
}

export const Damage: React.FC<DamageProps> = (props: DamageProps) => {
  if (props.fighter.lastHit === 0) {
    return <></>;
  }

  return (
    <StyledDamage key={props.fighter.health}>
      -{props.fighter.lastHit}
    </StyledDamage>
  );
};
