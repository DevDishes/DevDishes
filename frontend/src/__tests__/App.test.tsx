import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders DevDishes app', () => {
  render(<App />);
  expect(screen.getByText(/DevDishes/i)).toBeInTheDocument();
}); 