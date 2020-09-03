import React, { useReducer, useState } from 'react';
import styled from 'styled-components';

import { battleReducer, BattleAction, DiceRoll, Battle, initialBattleState } from './BattleReducer';

import { DiceComponent } from './DiceComponent';
import { DamageComponent } from './DamageComponent';

const breakpointSmall = '620px';
const Wrapper = styled.div`
  font-size: 2em;
  height: 100%;

  display: flex;
  flex-direction: column;

  .content {
    flex: 1 1;

    display: flex;
    justify-content: space-around;
    @media (max-width: ${breakpointSmall}) {
      flex-direction: column;
      justify-content: flex-start;
    }

    .player {
      flex: 0 1 250px;
      margin: 10pt;

      display: flex;
      flex-direction: column;
      @media (max-width: ${breakpointSmall}) {
        flex: 0 1;
        border: 5px dotted black;

        flex-direction: row;
      }
      .nameCard {
        border: 5px dotted black;
        text-align: left;
        padding: 20pt;

        @media (max-width: ${breakpointSmall}) {
          flex: 1 0;

          border: 0;
        }
      }
      .dice {
        text-align: center;
        font-size: 3em;

        display: flex;
        justify-content: space-around;
        @media (max-width: ${breakpointSmall}) {
          flex: 0 0 50pt;

          font-size: 2em;
          line-height: 0.5em;
          flex-direction: column;
        }
      }
    }
  }
  .won {
    color: green;
  }
  .lost {
    color: red;
  }
  .footer {
    flex: 0 1;
    display: flex;
    flex-direction: column;

    button,
    .banner {
      flex: 1 1 100%;

      margin: 10pt;
      padding: 20pt;
      font-size: 1em;
    }
    button {
      border: 5px solid black;
      background: pink;
    }
    .banner {
      font-size: 2em;
      @media (max-width: ${breakpointSmall}) {
        font-size: 1em;
      }
    }
  }
`;

const getRandom = (): DiceRoll => {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
};

export const BattleComponent: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<Battle, BattleAction>>(battleReducer, initialBattleState);
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    setRolling(true);
    setTimeout(() => {
      const action: BattleAction = {
        actionType: 'DiceRolled',
        human1: getRandom(),
        human2: getRandom(),
        monster1: getRandom(),
        monster2: getRandom(),
      };
      setRolling(false);
      dispatch(action);
    }, 1000);
  };

  const handleReset = () => {
    dispatch({ actionType: 'Reset' });
  };

  const rollButton = state?.battleInProgress && !rolling;
  const resetButton = !state?.battleInProgress;
  const won = state.monster.health === 0;
  const lost = state.human.health === 0;
  return (
    <Wrapper>
      {state && (
        <div className="content">
          <div className="player">
            <div className="nameCard">
              <div>HUMAN</div>
              <div>
                <span role="img" aria-label="health">
                  🖤
                </span>{' '}
                {state.human.health} <DamageComponent value={state.human.lastHit} rolling={rolling} />
              </div>
            </div>
            <div className="dice">
              <DiceComponent rolling={rolling} lastRolled={state.human.dice1} />
              <DiceComponent rolling={rolling} lastRolled={state.human.dice2} />
            </div>
          </div>
          <div className="player">
            <div className="nameCard">
              <div>MONSTER</div>
              <div>
                <span role="img" aria-label="health">
                  🖤
                </span>{' '}
                {state.monster.health} <DamageComponent value={state.monster.lastHit} rolling={rolling} />
              </div>
            </div>
            <div className="dice">
              <DiceComponent rolling={rolling} lastRolled={state.monster.dice1} />
              <DiceComponent rolling={rolling} lastRolled={state.monster.dice2} />
            </div>
          </div>
        </div>
      )}
      <div className="footer">
        {resetButton && <button onClick={handleReset}>Reset</button>}
        {won && <div className="banner won">PLAYER WON</div>}
        {lost && <div className="banner lost">PLAYER LOST</div>}
        {rollButton && <button onClick={handleRoll}>Roll!</button>}
      </div>
    </Wrapper>
  );
};
