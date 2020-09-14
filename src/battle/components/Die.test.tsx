import React from 'react';
import { render, act } from '@testing-library/react';

import { Die } from './Die';
import { Face } from '../state';
import { untilFaceTurned } from '../utils/Timer';

jest.mock('../utils/Timer');

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
    expect(queryByRole('img', { name: value.toString() })).toBeInTheDocument();
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

  test('rolling dice has appropriate aria image label', async () => {
    const props = {
      lastRolled: 3 as Face,
      rolling: true,
    };

    const resolved = Promise.resolve();
    (untilFaceTurned as jest.Mock).mockImplementationOnce(() => resolved);

    const { queryByRole } = render(<Die {...props} />);
    await act(async () => resolved);

    expect(queryByRole('img', { name: /rolling/i })).toBeInTheDocument();
  });
});
