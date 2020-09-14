import React from 'react';
import { Die } from './Die';
import { render, act } from '@testing-library/react';
import { Face } from '../state';
import { untilFaceTurned } from '../utils/SetTimeout';

jest.mock('../utils/SetTimeout');

describe('props', () => {
  const props = {
    lastRolled: 1,
    rolling: false,
  };

  test.each([
    [1 as Face, '⚀'],
    [2 as Face, '⚁'],
    [3 as Face, '⚂'],
    [4 as Face, '⚃'],
    [5 as Face, '⚄'],
    [6 as Face, '⚅'],
  ])('last rolled value %p will render %p', (value: Face, result: string) => {
    const { queryByText, queryByRole } = render(
      <Die {...props} lastRolled={value} />,
    );
    expect(queryByText(result)).toBeInTheDocument();
    expect(queryByRole('img')).toBeInTheDocument();
  });

  test('undefined last rolled will not render ARIA "img"', () => {
    const { queryByRole } = render(<Die {...props} lastRolled={undefined} />);
    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  test('rolling dice loops from 1 to 6', async () => {
    const props = {
      lastRolled: 3 as Face,
      rolling: true,
    };

    const queue: (() => void)[] = [];
    (untilFaceTurned as jest.Mock).mockImplementation(async () => {
      await new Promise((resolve) => queue.push(resolve));
    });

    const { queryByText } = render(<Die {...props} />);
    expect(queryByText('⚀')).toBeInTheDocument();

    await act(async () => queue.shift()?.());
    expect(queryByText('⚁')).toBeInTheDocument();

    await act(async () => queue.shift()?.());
    expect(queryByText('⚂')).toBeInTheDocument();

    await act(async () => queue.shift()?.());
    expect(queryByText('⚃')).toBeInTheDocument();

    await act(async () => queue.shift()?.());
    expect(queryByText('⚄')).toBeInTheDocument();

    await act(async () => queue.shift()?.());
    expect(queryByText('⚅')).toBeInTheDocument();

    await act(async () => queue.shift()?.());
    expect(queryByText('⚀')).toBeInTheDocument();
  });
});
