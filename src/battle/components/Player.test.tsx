import React from 'react';
import { render } from '@testing-library/react';
import { Fighter } from '../state';
import { Player } from './Player';

describe('props', () => {
  const fighter: Fighter = {
    health: 99,
    lastRoll: [1, 6],
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
    expect(queryByText('99')).toBeInTheDocument();
  });

  test('with last roll', () => {
    const { queryByText } = render(<Player {...props} />);
    expect(queryByText('⚀')).toBeInTheDocument();
    expect(queryByText('⚅')).toBeInTheDocument();
  });

  test('without last roll', () => {
    const { queryByText } = render(
      <Player {...props} fighter={{ health: 99, lastHit: 0 }} />,
    );
    expect(queryByText('⚀')).not.toBeInTheDocument();
    expect(queryByText('⚅')).not.toBeInTheDocument();
  });
});