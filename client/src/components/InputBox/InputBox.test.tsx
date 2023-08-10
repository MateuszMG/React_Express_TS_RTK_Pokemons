import { render, screen } from '@testing-library/react';

import { InputBox } from './InputBox';

describe('<InputBox/>', () => {
  it('renders with label and children', () => {
    const labelText = 'Username';

    const { getByText } = render(
      <InputBox label={labelText}>
        <input />
      </InputBox>,
    );

    const labelElement = getByText(labelText);
    expect(labelElement).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const errorMessage = 'Invalid input';
    const { getByText } = render(<InputBox error={errorMessage}>'</InputBox>);

    const errorElement = getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
