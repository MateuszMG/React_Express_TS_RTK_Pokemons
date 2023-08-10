import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { Loader } from '../Loader/Loader';
import styles from './Button.module.scss';

interface GlobalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  isError?: boolean;
  isLoading?: boolean;
  testId?: string;
}

export const Button = forwardRef<HTMLButtonElement, GlobalButtonProps>(
  (
    {
      children,
      disabled,
      isError,
      isLoading,
      testId = '',
      ...rest
    }: GlobalButtonProps,
    ref,
  ) => {
    const idDisabled = disabled || isLoading || isError;

    return (
      <button
        {...rest}
        className={`${styles.button} ${idDisabled && styles.disabled}`}
        data-testid={`button__${testId}`}
        disabled={idDisabled}
        ref={ref}
      >
        {isLoading ? <Loader testId={`button--${testId}`} /> : children}
      </button>
    );
  },
);
