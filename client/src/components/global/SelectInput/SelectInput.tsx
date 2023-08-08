import ReactSelect, { Options as ReactSelectOptions } from 'react-select';

import { reactSelectStyles } from './SelectInput.styled';

type Option = { label: string; value: string };
export type Options = ReactSelectOptions<Option>;

interface SelectInputProps {
  onChange: (val: Option) => void;
  options: Options;
}

export const SelectInput = ({ onChange, options }: SelectInputProps) => {
  return (
    <ReactSelect
      onChange={(value: Option) => onChange(value)}
      options={options}
      styles={reactSelectStyles}
    />
  );
};
