import React from 'react';
import styled from 'styled-components';

import { Fighter } from '../state';

import { Damage } from './Damage';
import { Die } from './Die';

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

const breakpointSmall = '620px';
const Styled = styled.div`
  flex: 0 0 7em;
  margin: 0.5em;
  display: flex;
  flex-direction: column;
  @media (max-width: ${breakpointSmall}) {
    flex: 0 1;
    border: 5px dotted black;
    flex-direction: row;
  }
  .details {
    border: 5px dotted black;
    text-align: left;
    padding: 1em;
    @media (max-width: ${breakpointSmall}) {
      flex: 1 0;
      border: 0;
    }
  }
  .dice {
    font-size: 2em;
    display: flex;
    justify-content: space-around;
    @media (max-width: ${breakpointSmall}) {
      flex: 0 0 1.5em;
      line-height: 0.5em;
      flex-direction: column;
    }
  }
`;

export const Player: React.FC<PlayerProps> = (props: PlayerProps) => {
  return (
    <Styled>
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
    </Styled>
  );
};
