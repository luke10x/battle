import React from 'react';
import { Fighter } from '../state';
import { Damage } from './Damage';
import { Die } from './Die';
import { StyledPlayer } from './Styled';

interface PlayerProps {
  title: string;
  fighter: Fighter;
  rolling: boolean;
}

const Hearth: React.FC = () => (
  <span role="img" aria-label="health">
    🖤
  </span>
);

export const Player: React.FC<PlayerProps> = (props: PlayerProps) => {
  return (
    <StyledPlayer>
      <div className="details">
        <div>{props.title}</div>
        <div>
          <Hearth /> {props.fighter.health} <Damage fighter={props.fighter} />
        </div>
      </div>
      {props.fighter.lastRoll && (
        <div className="dice">
          <Die rolling={props.rolling} lastRolled={props.fighter.lastRoll[0]} />
          <Die rolling={props.rolling} lastRolled={props.fighter.lastRoll[1]} />
        </div>
      )}
    </StyledPlayer>
  );
};
