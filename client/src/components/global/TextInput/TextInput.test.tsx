import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from './TextInput';

describe('<TextInput/>', () => {
  it('renders with label and input', () => {
    const labelText = 'Username';
    render(<TextInput label={labelText} />);

    const labelElement = screen.getByText(labelText);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const errorMessage = 'Invalid input';
    render(<TextInput error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    const testId = 'custom-input';
    render(<TextInput testId={testId} />);

    const inputElement = screen.getByTestId(`input__${testId}`);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onChange callback when input changes', () => {
    const mockOnChange = jest.fn();
    render(<TextInput onChange={mockOnChange} />);

    const inputElement = screen.getByRole('textbox');
    const inputValue = 'test input';
    userEvent.type(inputElement, inputValue);

    expect(mockOnChange).toHaveBeenCalledTimes(inputValue.length);
  });

  it('accepts and displays initial value', () => {
    const initialValue = 'Initial Value';
    render(<TextInput defaultValue={initialValue} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(initialValue);
  });
});
