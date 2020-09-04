import React, { useReducer, useState } from 'react';
import styled from 'styled-components';

import { battleReducer, Action, Dice, Battle, initialBattleState } from './BattleReducer';

import { PlayerComponent } from './PlayerComponent';

const breakpointSmall = '620px';
const Wrapper = styled.div`
  font-size: 1.5em;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    display: flex;
    justify-content: space-around;
    @media (max-width: ${breakpointSmall}) {
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  .footer {
    flex: 0;
    padding: 0.5em;
    & > * {
      padding: 1em;
      margin: 0px auto;
      box-sizing: border-box;
      width: 50%;
      @media (max-width: ${breakpointSmall}) {
        width: 100%;
      }
    }
    button {
      font-size: 1em;
      border: 5px solid black;
      background: pink;
      &.disabled {
        opacity: 0.3;
      }
    }
    .banner.won {
      color: green;
    }
    .banner.lost {
      color: red;
    }
  }
`;

const getRandom = (): Dice => {
  return (Math.floor(Math.random() * 6) + 1) as Dice;
};

export const BattleComponent: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<Battle, Action>>(battleReducer, initialBattleState);
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    setRolling(true);
    setTimeout(() => {
      const action: Action = {
        actionType: 'DiceRolled',
        human: [getRandom(), getRandom()],
        monster: [getRandom(), getRandom()],
      };
      setRolling(false);
      dispatch(action);
    }, 1000);
  };

  const handleReset = () => {
    dispatch({ actionType: 'Reset' });
  };

  const rollButton = state.battleInProgress;
  const resetButton = !state.battleInProgress;
  const won = state.monster.health === 0;
  const lost = state.human.health === 0;
  return (
    <Wrapper>
      <div className="content">
        <PlayerComponent title="HUMAN" rolling={rolling} player={state.human} />
        <PlayerComponent title="MONSTER" rolling={rolling} player={state.monster} />
      </div>
      <div className="footer">
        {resetButton && <button onClick={handleReset}>Reset</button>}
        {won && <div className="banner won">HUMAN WON</div>}
        {lost && <div className="banner lost">MONSTER WON</div>}
        {rollButton && (
          <button className={rolling ? 'disabled' : ''} onClick={rolling ? undefined : handleRoll}>
            Roll!
          </button>
        )}
      </div>
    </Wrapper>
  );
};
