import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders "Roll" button', () => {
  const { getByText } = render(<App />);
  expect(getByText(/roll!/i)).toBeInTheDocument();
});
