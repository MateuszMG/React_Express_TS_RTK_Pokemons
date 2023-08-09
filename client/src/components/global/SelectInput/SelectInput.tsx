import ReactSelect, { Options as ReactSelectOptions } from 'react-select';

import { reactSelectStyles } from './SelectInput.styled';

type Option = { label: string; value: string };
export type Options = ReactSelectOptions<Option>;

interface SelectInputProps {
  defaultValue?: Option;
  onChange: (val: Option) => void;
  options: Options;
}

export const SelectInput = ({
  defaultValue,
  onChange,
  options,
}: SelectInputProps) => {
  return (
    <ReactSelect
      defaultValue={defaultValue}
      onChange={(value: Option) => onChange(value)}
      options={options}
      styles={reactSelectStyles}
    />
  );
};
