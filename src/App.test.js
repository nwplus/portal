import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Live website.', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Live website./i);
  expect(element).toBeInTheDocument();
});
