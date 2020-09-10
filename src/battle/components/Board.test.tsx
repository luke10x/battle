import React from 'react';
import { render } from '@testing-library/react';

import { Board } from './Board';
import { initialState, Battle } from '../state';

describe('props', () => {
  const props = {
    battle: initialState,
    onRoll: jest.fn,
    onReset: jest.fn,
  };

  describe('battle is in progress', () => {
    const battle = {
      ...initialState,
      inProgress: true,
    };

    test('shows "Roll" button', () => {
      const { queryByRole } = render(<Board {...props} battle={battle} />);
      expect(queryByRole('button', { name: /roll!/i })).toBeInTheDocument();
    });

    test('does not show "Reset" button', () => {
      const { queryByRole } = render(<Board {...props} battle={battle} />);

      expect(queryByRole('button', { name: /reset/i })).not.toBeInTheDocument();
    });
  });

  describe('battle is not in progress', () => {
    const battle = {
      ...initialState,
      inProgress: false,
    };

    test('does not show "Roll" button', () => {
      const { queryByRole } = render(<Board {...props} battle={battle} />);

      expect(queryByRole('button', { name: /roll!/i })).not.toBeInTheDocument();
    });

    test('shows "Reset" button', () => {
      const { queryByRole } = render(<Board {...props} battle={battle} />);

      expect(queryByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    test('shows "Reset" button', () => {
      const { queryByRole } = render(<Board {...props} battle={battle} />);

      expect(queryByRole('button', { name: /reset/i })).toBeInTheDocument();
    });
  });

  describe('expected banners', () => {
    const humanWins = /human won/i;
    const monsterWins = /monster won/i;

    describe('both fighters alive', () => {
      test('no banner is shown', () => {
        const { queryByText } = render(<Board {...props} />);
        expect(queryByText(humanWins)).not.toBeInTheDocument();
        expect(queryByText(monsterWins)).not.toBeInTheDocument();
      });
    });

    describe('human is dead', () => {
      const battle: Battle = {
        ...initialState,
        human: { ...initialState.human, health: 0 },
      };

      test('renders "monster won" banner', () => {
        const { queryByText } = render(<Board {...props} battle={battle} />);

        expect(queryByText(/human won/i)).not.toBeInTheDocument();
        expect(queryByText(/monster won/i)).toBeInTheDocument();
      });
    });

    describe('monster is dead', () => {
      const battle: Battle = {
        ...initialState,
        monster: { ...initialState.monster, health: 0 },
      };

      test('renders "human won" banner', () => {
        const { queryByText } = render(<Board {...props} battle={battle} />);

        expect(queryByText(/human won/i)).toBeInTheDocument();
        expect(queryByText(/monster won/i)).not.toBeInTheDocument();
      });
    });
  });

  test('player names are displayed', () => {
    const { queryByText } = render(<Board {...props} />);
    expect(queryByText(/human/i)).toBeInTheDocument();
    expect(queryByText(/monster/i)).toBeInTheDocument();
  });
});
