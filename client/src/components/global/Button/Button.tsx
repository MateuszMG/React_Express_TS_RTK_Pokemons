import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { Loader } from '../Loader/Loader';
import styles from './Button.module.scss';

interface GlobalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  isError?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, GlobalButtonProps>(
  (
    { children, disabled, isError, isLoading, ...rest }: GlobalButtonProps,
    ref,
  ) => {
    const idDisabled = disabled || isLoading || isError;

    return (
      <button
        {...rest}
        className={`${styles.button} ${idDisabled && styles.disabled}`}
        disabled={idDisabled}
        ref={ref}
      >
        {isLoading ? <Loader /> : children}
      </button>
    );
  },
);
