import styled, { keyframes } from 'styled-components';

const breakpointSmall = '620px';

export const StyledBoard = styled.div`
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

export const StyledPlayer = styled.div`
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

const rotate = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const StyledDamage = styled.span`
  color: red;
  opacity: 0;
  animation: ${rotate} 0.8s linear;
`;
