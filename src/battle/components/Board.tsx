import React, { useReducer, useState } from 'react';
import styled from 'styled-components';

import { battleReducer, Action, Face, Battle, initialState } from '../state';

import { Player } from './Player';

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

const getRandom = (): Face => {
  return (Math.floor(Math.random() * 6) + 1) as Face;
};

export const Board: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<Battle, Action>>(
    battleReducer,
    initialState,
  );
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

  const rollButton = state.inProgress;
  const resetButton = !state.inProgress;
  const won = state.monster.health === 0;
  const lost = state.human.health === 0;
  return (
    <Wrapper>
      <div className="content">
        <Player title="HUMAN" rolling={rolling} fighter={state.human} />
        <Player title="MONSTER" rolling={rolling} fighter={state.monster} />
      </div>
      <div className="footer">
        {resetButton && <button onClick={handleReset}>Reset</button>}
        {won && <div className="banner won">HUMAN WON</div>}
        {lost && <div className="banner lost">MONSTER WON</div>}
        {rollButton && (
          <button
            className={rolling ? 'disabled' : ''}
            onClick={rolling ? undefined : handleRoll}
          >
            Roll!
          </button>
        )}
      </div>
    </Wrapper>
  );
};
