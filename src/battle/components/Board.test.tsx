import React from 'react';
import { render } from '@testing-library/react';

import { Board } from './Board';
import { initialState, Battle } from '../state';

const defaultBattle = initialState;
const defaultProps = {
  battle: defaultBattle,
  onRoll: jest.fn,
  onReset: jest.fn,
};

describe('render', () => {
  describe('buttons', () => {
    describe('battle is in progress', () => {
      const battle = {
        ...defaultBattle,
        inProgress: true,
      };

      test('shows "Roll" button', () => {
        const { queryByRole } = render(
          <Board {...defaultProps} battle={battle} />,
        );
        expect(queryByRole('button', { name: /roll!/i })).toBeInTheDocument();
      });

      test('does not show "Reset" button', () => {
        const { queryByRole } = render(
          <Board {...defaultProps} battle={battle} />,
        );

        expect(
          queryByRole('button', { name: /reset/i }),
        ).not.toBeInTheDocument();
      });
    });

    describe('battle is not in progress', () => {
      const battle = {
        ...defaultBattle,
        inProgress: false,
      };

      test('does not show "Roll" button', () => {
        const { queryByRole } = render(
          <Board {...defaultProps} battle={battle} />,
        );

        expect(
          queryByRole('button', { name: /roll!/i }),
        ).not.toBeInTheDocument();
      });

      test('shows "Reset" button', () => {
        const { queryByRole } = render(
          <Board {...defaultProps} battle={battle} />,
        );

        expect(queryByRole('button', { name: /reset/i })).toBeInTheDocument();
      });

      test('shows "Reset" button', () => {
        const { queryByRole } = render(
          <Board {...defaultProps} battle={battle} />,
        );

        expect(queryByRole('button', { name: /reset/i })).toBeInTheDocument();
      });
    });
  });

  describe('render winner banners', () => {
    const humanWins = /human won/i;
    const monsterWins = /monster won/i;

    describe('both fighters alive', () => {
      test('no banner is shown', () => {
        const { queryByText } = render(<Board {...defaultProps} />);
        expect(queryByText(humanWins)).not.toBeInTheDocument();
        expect(queryByText(monsterWins)).not.toBeInTheDocument();
      });
    });

    describe('human is dead', () => {
      const battle: Battle = {
        ...defaultBattle,
        human: { ...defaultBattle.human, health: 0 },
      };

      test('renders "monster won" banner', () => {
        const { queryByText } = render(
          <Board {...defaultProps} battle={battle} />,
        );

        expect(queryByText(/human won/i)).not.toBeInTheDocument();
        expect(queryByText(/monster won/i)).toBeInTheDocument();
      });
    });

    describe('monster is dead', () => {
      const battle: Battle = {
        ...defaultBattle,
        monster: { ...defaultBattle.monster, health: 0 },
      };

      test('renders "human won" banner', () => {
        const { queryByText } = render(
          <Board {...defaultProps} battle={battle} />,
        );

        expect(queryByText(/human won/i)).toBeInTheDocument();
        expect(queryByText(/monster won/i)).not.toBeInTheDocument();
      });
    });
  });

  test('player names', () => {
    const { queryByText } = render(<Board {...defaultProps} />);
    expect(queryByText(/human/i)).toBeInTheDocument();
    expect(queryByText(/monster/i)).toBeInTheDocument();
  });
});
