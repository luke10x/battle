import React, { useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';

import { battleReducer, BattleAction, DiceRoll, Battle } from './BattleReducer';

import { DiceComponent } from './DiceComponent';
import { DamageComponent } from './DamageComponent';

const Wrapper = styled.div`
  font-size: 2em;
  height: 100%;

  display: flex;
  flex-direction: column;
  .container {
    padding-top: 1em;
    display: flex;

    // also is an item in an outermost flex:
    flex: 1 0 auto;

    .item {
      flex-grow: 1;
      height: 100px;
      .nameCard {
        border: 5px dotted black;
        width: 200px;
        margin: 0px auto;
        text-align: left;
        padding: 1em;
      }
      .dice {
        text-align: center;
        margin: 0px auto;
        font-size: 3em;
      }
    }
    .item + .item {
      margin-left: 2%;
    }
  }
  .banner {
    font-size: 3em;
  }
  .won {
    color: green;
  }
  .lost {
    color: red;
  }
  .footer {
    flex-shrink: 0;
    button {
      border: 5px solid black;
      margin: 1em;
      padding: 1em;
      font-size: 1em;
      background: pink;
    }
  }
`;

const getRandom = (): DiceRoll => {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
};

export const BattleComponent: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<Battle | undefined, BattleAction>>(battleReducer, undefined);
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    setRolling(true);
    setTimeout(() => {
      const action: BattleAction = {
        actionType: 'DiceRolled',
        player1: getRandom(),
        player2: getRandom(),
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

  useEffect(() => {
    if (!state) {
      dispatch({ actionType: 'Reset' });
    }
  });

  const rollButton = state?.battleInProgress && !rolling;
  const resetButton = !state?.battleInProgress;
  const won = state?.monster.health === 0;
  const lost = state?.player.health === 0;
  return (
    <Wrapper>
      {state && (
        <div className="container">
          <div className="item">
            <div className="nameCard">
              <div>PLAYER</div>
              <div>
                <span role="img" aria-label="health">
                  🖤
                </span>{' '}
                {state.player.health} <DamageComponent value={state.player.lastHit} rolling={rolling} />
              </div>
            </div>
            <div className="dice">
              <DiceComponent rolling={rolling} lastRolled={state.player.dice1} />
              <DiceComponent rolling={rolling} lastRolled={state.player.dice2} />
            </div>
          </div>
          <div className="item">
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
        {won && <div className="banner won">PLAYER WON</div>}
        {lost && <div className="banner lost">PLAYER LOST</div>}
        {rollButton && <button onClick={handleRoll}>Roll!</button>}
        {resetButton && <button onClick={handleReset}>Reset</button>}
      </div>
    </Wrapper>
  );
};
