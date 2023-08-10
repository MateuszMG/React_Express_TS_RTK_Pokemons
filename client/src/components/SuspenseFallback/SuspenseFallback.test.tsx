/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import { SuspenseFallback } from './SuspenseFallback';

describe('<SuspenseFallback />', () => {
  test('should render itself correctly', () => {
    const { getByTestId } = render(<SuspenseFallback />);

    const page = getByTestId('page__suspense-fallback');
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass('page');
  });

  test('should render loader', () => {
    const { getByTestId } = render(<SuspenseFallback />);

    const loaderElement = getByTestId('loader__suspense-fallback');
    expect(loaderElement).toBeInTheDocument();
  });
});
