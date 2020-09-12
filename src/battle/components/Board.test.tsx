import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Board } from './Board';
import { initialState, Battle } from '../state';
import { act } from 'react-dom/test-utils';

import { afterRolled } from '../utils/SetTimeout';
jest.mock('../utils/SetTimeout');

describe('props', () => {
  const props = {
    battle: initialState,
    onRoll: jest.fn(),
    onReset: jest.fn(),
  };

  describe('battle is in progress', () => {
    const battle = {
      ...initialState,
      inProgress: true,
    };
    afterEach(() => jest.resetAllMocks());

    test('shows "Roll" button', () => {
      const { queryByRole } = render(<Board {...props} battle={battle} />);
      expect(queryByRole('button', { name: /roll!/i })).toBeInTheDocument();
    });

    test('does not show "Reset" button', () => {
      const { queryByRole } = render(<Board {...props} battle={battle} />);

      expect(queryByRole('button', { name: /reset/i })).not.toBeInTheDocument();
    });

    test('roll button calls onRoll prop', () => {
      (afterRolled as jest.Mock).mockImplementationOnce(
        (callback: () => void) => {
          callback();
        },
      );

      const { getByRole } = render(<Board {...props} />);

      const button = getByRole('button', { name: /roll/i });
      fireEvent.click(button);

      expect(props.onRoll).toHaveBeenCalled();
    });

    test('roll button calls onRoll prop', async () => {
      const queue: (() => void)[] = [];
      const mutex = new Promise((resolve) => queue.push(resolve));

      (afterRolled as jest.Mock).mockImplementation(
        async (callback: () => void) => {
          await mutex;
          act(callback);
        },
      );

      const { getByRole } = render(<Board {...props} />);
      const button = getByRole('button', { name: /roll/i });
      fireEvent.click(button);

      expect(props.onRoll).not.toHaveBeenCalled();

      await queue.shift()?.();
      expect(props.onRoll).toHaveBeenCalled();
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

    test('reset button calls onReset prop', () => {
      const { getByRole } = render(<Board {...props} battle={battle} />);

      const button = getByRole('button', { name: /reset/i });
      fireEvent.click(button);

      expect(props.onReset).toHaveBeenCalled();
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
