import { ReactNode } from 'react';

import styles from './InputBox.module.scss';

interface InputBoxProps {
  children: ReactNode;
  error?: string;
  label?: string;
}

export const InputBox = ({ children, error, label }: InputBoxProps) => {
  return (
    <div className={styles.box}>
      <label className={styles.label}>{label}</label>
      {children}
      <span className={styles.error}>{error}</span>
    </div>
  );
};
