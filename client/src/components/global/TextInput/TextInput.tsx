import { forwardRef, InputHTMLAttributes } from 'react';

import { InputBox } from '../../InputBox/InputBox';
import styles from './TextInput.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  testId?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, testId = '', ...rest }: TextInputProps, ref) => {
    return (
      <InputBox label={label} error={error}>
        <input
          {...rest}
          className={styles.input}
          data-testid={`input__${testId}`}
          ref={ref}
        />
      </InputBox>
    );
  },
);
