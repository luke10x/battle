import React from 'react';
import { render } from '@testing-library/react';

import { Damage } from './Damage';

describe('props', () => {
  const fighter = {
    health: 8,
    lastHit: 0,
  };
  const props = {
    fighter: fighter,
  };

  test('displays last hit with negative sign', () => {
    const { container } = render(<Damage {...props} />);
    expect(container.textContent).toEqual('');
  });

  test('displays last hit with negative sign', () => {
    const propsWithLastHit = { ...props, fighter: { ...fighter, lastHit: 2 } };
    const { container } = render(<Damage {...propsWithLastHit} />);
    expect(container.textContent).toEqual('-2');
  });

  test('displays last hit with negative sign', () => {
    const propsWithLastHit = { ...props, fighter: { ...fighter, lastHit: 2 } };
    const { container } = render(<Damage {...propsWithLastHit} />);
    expect(container.textContent).toEqual('-2');
  });

  test('element is recreated when value changes', () => {
    const fighterAfterOneHit = { health: 9, lastHit: 1 };
    const { rerender, getByText } = render(
      <Damage fighter={fighterAfterOneHit} />,
    );
    const minusOne = getByText(/-1/i);

    const fighterAfterTwoHits = { health: 7, lastHit: 2 };
    rerender(<Damage fighter={fighterAfterTwoHits} />);
    const minusTwo = getByText(/-2/i);

    expect(minusOne === minusTwo).toBeFalsy();
  });
});
