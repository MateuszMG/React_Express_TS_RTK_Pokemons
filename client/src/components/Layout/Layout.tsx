import { ReactNode } from 'react';

import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.page}>{children}</div>
      <Footer />
    </div>
  );
};
