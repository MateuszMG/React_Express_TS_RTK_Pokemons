import { render } from '@testing-library/react';

import { Loader, LoaderSizes } from './Loader';

describe('<Loader/>', () => {
  it('renders with default size and default testId', () => {
    const { getByTestId } = render(<Loader />);
    const loaderElement = getByTestId('loader__');

    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });

  it('renders with specified size and testId', () => {
    const { getByTestId } = render(
      <Loader size={LoaderSizes.xxl} testId='button' />,
    );
    const loaderElement = getByTestId('loader__button');

    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });

  it('renders with default size when size prop is not provided', () => {
    const { getByTestId } = render(<Loader testId='button' />);
    const loaderElement = getByTestId('loader__button');

    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });
});
