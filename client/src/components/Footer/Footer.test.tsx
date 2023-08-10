/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import { Footer } from './Footer';

test('Footer renders correctly', () => {
  const { getByText } = render(<Footer />);

  const copyrightText = getByText(/© Pokemons/i);
  expect(copyrightText).toBeInTheDocument();
});
