import React from 'react';
import { render } from '@testing-library/react';

import { Player } from './Player';
import { Fighter } from '../state';

describe('props', () => {
  const fighter: Fighter = {
    health: 9,
    lastRoll: [2, 3],
    lastHit: 0,
  };
  const props = {
    fighter: fighter,
    title: 'Luke',
    rolling: false,
  };

  test('player title', () => {
    const { queryByText } = render(<Player {...props} />);
    expect(queryByText(/luke/i)).toBeInTheDocument();
  });

  test('fighter health', () => {
    const { queryByText } = render(<Player {...props} />);
    expect(queryByText('9')).toBeInTheDocument();
  });

  test('show dice of lastRoll', () => {
    const { queryByText } = render(<Player {...props} />);
    expect(queryByText('⚁')).toBeInTheDocument();
    expect(queryByText('⚂')).toBeInTheDocument();
  });

  describe('before any roll is made', () => {
    const fighterBeforeRolling = { health: 10, lastHit: 0 };

    test('show no dice', () => {
      const { queryByText } = render(
        <Player {...props} fighter={fighterBeforeRolling} />,
      );
      expect(queryByText('⚁')).not.toBeInTheDocument();
      expect(queryByText('⚂')).not.toBeInTheDocument();
    });
  });

  test('display damage', async () => {
    const { queryByText } = render(
      <Player {...props} fighter={{ health: 9, lastHit: 1 }} />,
    );
    expect(queryByText(/-1/i)).toBeInTheDocument();
  });
});
