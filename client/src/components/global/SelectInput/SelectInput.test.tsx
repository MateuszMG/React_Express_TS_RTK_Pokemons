import { fireEvent, render } from '@testing-library/react';

import { SelectInput } from './SelectInput';

const mockOptions = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
];

describe('SelectInput component', () => {
  it('renders with options and custom option component', () => {
    const { getByTestId } = render(
      <SelectInput options={mockOptions} onChange={() => {}} />,
    );
    const selectInput = getByTestId('select__');
    fireEvent.keyDown(selectInput.firstChild!, { key: 'ArrowDown' });

    for (const option of mockOptions) {
      const optionElement = getByTestId(`option__${option.label}`);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveTextContent(option.label);
    }
  });

  it('calls onChange with selected option', () => {
    const mockOnChange = jest.fn();
    const { getByTestId, getByText } = render(
      <SelectInput options={mockOptions} onChange={mockOnChange} />,
    );

    const selectInput = getByTestId('select__');
    fireEvent.keyDown(selectInput.firstChild!, { key: 'ArrowDown' });

    const option2 = getByText(mockOptions[1].label);
    fireEvent.click(option2);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays the default option', () => {
    const defaultValue = mockOptions[2];
    const { getByTestId } = render(
      <SelectInput
        options={mockOptions}
        defaultValue={defaultValue}
        onChange={() => {}}
      />,
    );
    const selectInput = getByTestId('select__');
    expect(selectInput).toHaveTextContent(defaultValue.label);
  });
});
