import React from 'react';
import { Die } from './Die';
import { render } from '@testing-library/react';
import { Face } from '../state';

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
});
