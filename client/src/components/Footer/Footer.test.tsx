import { render } from '@testing-library/react';

import { Footer } from './Footer';

describe('<Footer />', () => {
  test('should render iself correctly', () => {
    const { getByTestId } = render(<Footer />);

    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
  });

  test('should render text correctly', () => {
    const { getByText } = render(<Footer />);

    const text = getByText(/Pokemons/i);
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('text');
  });
});
