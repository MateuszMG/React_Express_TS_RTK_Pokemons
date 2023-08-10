import ReactSelect, {
  components,
  OptionProps,
  Options as ReactSelectOptions,
} from 'react-select';

import { reactSelectStyles } from './SelectInput.styled';

type Option = { label: string; value: string };
export type Options = ReactSelectOptions<Option>;

const CustomOption = (props: OptionProps<Option, false>) => {
  return (
    <components.Option {...props}>
      <span
        data-testid={`option__${props.data.label}`}
        key={props.innerProps.key}
      >
        {props.data.label}
      </span>
    </components.Option>
  );
};

interface SelectInputProps {
  defaultValue?: Option;
  onChange: (selectedOption: Option | null) => void;
  options: Options;
  testId?: string;
}

export const SelectInput = ({
  defaultValue,
  onChange,
  options,
  testId = '',
}: SelectInputProps) => {
  return (
    <div data-testid={`select__${testId}`}>
      <ReactSelect
        components={{
          Option: CustomOption,
        }}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        styles={reactSelectStyles}
      />
    </div>
  );
};
