import { forwardRef, InputHTMLAttributes } from 'react';

import { InputBox } from '../../InputBox/InputBox';
import styles from './TextInput.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...rest }: TextInputProps, ref) => {
    return (
      <InputBox label={label} error={error}>
        <input className={styles.input} {...rest} ref={ref} />
      </InputBox>
    );
  },
);
