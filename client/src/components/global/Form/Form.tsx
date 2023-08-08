import { FormHTMLAttributes, ReactNode } from 'react';

import styles from './Form.module.scss';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

export const Form = ({ children, className, ...rest }: FormProps) => {
  return (
    <form {...rest} className={`${styles.form} ${className}`}>
      {children}
    </form>
  );
};

interface ButtonsWrapperProps {
  children: ReactNode;
}

Form.ButtonsWrapper = ({ children }: ButtonsWrapperProps) => (
  <div className={styles.buttonsWrapper}>{children}</div>
);
