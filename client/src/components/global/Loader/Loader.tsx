import { PulseLoader } from 'react-spinners';

import styles from './Loader.module.scss';

interface LoaderProps {
  size?: number;
}

export const Loader = ({ size }: LoaderProps) => {
  return (
    <PulseLoader className={styles.loader} loading={true} size={size || 10} />
  );
};
