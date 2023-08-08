import { GroupBase, StylesConfig } from 'react-select';

export const reactSelectStyles: StylesConfig<any, false, GroupBase<any>> = {
  container: (provided) => ({
    ...provided,
    minWidth: '120px',
    ':focus': {
      outline: 'none',
      border: 'none',
    },
  }),
  option: (provided) => ({
    ...provided,
    color: `var(--backgroundPrimary)`,
  }),

  control: (provided) => ({
    ...provided,
    width: '100%',
    borderRadius: '8px',
    outline: 'none',
    ':focus': {
      outline: 'none',
      border: 'none',
    },
  }),
};
