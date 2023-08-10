import { fireEvent, render } from '@testing-library/react';

import { Button } from './Button';

describe('<Button />', () => {
  it('renders string correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Button>
        <p>Text</p>
      </Button>,
    );
    const buttonElement = getByText('Text');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders loader when isLoading is true', () => {
    const { getByTestId } = render(<Button isLoading>Button</Button>);
    const loaderElement = getByTestId('loader__button--');
    expect(loaderElement).toBeInTheDocument();
  });

  it('renders as disabled when isLoading is true', () => {
    const { getByTestId } = render(<Button isLoading>Button</Button>);
    const buttonElement = getByTestId('button__');
    expect(buttonElement).toBeDisabled();
  });

  it('renders as disabled when disabled is true', () => {
    const { getByTestId } = render(<Button disabled>Button</Button>);
    const buttonElement = getByTestId('button__');
    expect(buttonElement).toBeDisabled();
  });

  it('renders as disabled when isError is true', () => {
    const { getByTestId } = render(<Button isError>Button</Button>);
    const buttonElement = getByTestId('button__');
    expect(buttonElement).toBeDisabled();
  });

  it('renders with the provided testId', () => {
    const { getByTestId } = render(
      <Button testId='my-button'>Click me</Button>,
    );
    const buttonElement = getByTestId('button__my-button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders loader with the provided testId when isLoading is true', () => {
    const { getByTestId } = render(
      <Button isLoading testId='loading-button'>
        Button
      </Button>,
    );
    const loaderElement = getByTestId('loader__button--loading-button');
    expect(loaderElement).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>,
    );
    const buttonElement = getByText('Click me');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
