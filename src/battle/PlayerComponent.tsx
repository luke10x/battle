import React from 'react';
import { Player } from './BattleReducer';
import { DamageComponent } from './DamageComponent';
import { DiceComponent } from './DiceComponent';
import styled from 'styled-components';

interface PlayerComponentProps {
  title: string;
  player: Player;
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

export const PlayerComponent: React.FC<PlayerComponentProps> = (props: PlayerComponentProps) => {
  return (
    <Styled>
      <div className="details">
        <div>{props.title}</div>
        <div>
          <Hearth /> {props.player.health} <DamageComponent player={props.player} />
        </div>
      </div>
      {props.player.lastRoll && (
        <div className="dice">
          <DiceComponent rolling={props.rolling} lastRolled={props.player.lastRoll[0]} />
          <DiceComponent rolling={props.rolling} lastRolled={props.player.lastRoll[1]} />
        </div>
      )}
    </Styled>
  );
};
