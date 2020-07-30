import React, { useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';

import { battleReducer, BattleAction, DiceRoll } from './BattleReducer';

import { DiceComponent } from './DiceComponent';
import { DamageComponent } from './DamageComponent';

const Wrapper = styled.div`
margin: 1em;
font-size: 2em;
.container {
  display: flex;
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
  }
  .item + .item {
    margin-left: 2%;
  }
}
button {
  border: 5px solid black;
  padding 2em;
  font-size: 1em;
}
.dice {
  font-size: 3em;
}
.banner {
  font-size: 2em;
}
.won {
  color: green;
}
.lost {
  color: red;
}
`;

const getRandom = (): DiceRoll => {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
};

export const BattleComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [state, dispatch] = useReducer(battleReducer, undefined);
  const [rolling, setRolling] = useState(false);
  const [round, setRound] = useState(0);

  const handleRoll = () => {
    console.log('roll', state);
    setRolling(true);
    setRound(round + 1);

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
              <DiceComponent rolling={rolling} value={state.player.dice1} />
              <DiceComponent rolling={rolling} value={state.player.dice2} />
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
              <DiceComponent rolling={rolling} value={state.monster.dice1} />
              <DiceComponent rolling={rolling} value={state.monster.dice2} />
            </div>
          </div>
        </div>
      )}
      {won && <div className="banner won">PLAYER WON</div>}
      {lost && <div className="banner lost">PLAYER LOST</div>}
      {rollButton && <button onClick={handleRoll}>Roll!</button>}
      {resetButton && <button onClick={handleReset}>Reset</button>}
    </Wrapper>
  );
};
