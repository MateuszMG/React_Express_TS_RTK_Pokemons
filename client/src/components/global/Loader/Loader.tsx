import { PulseLoader } from 'react-spinners';

import styles from './Loader.module.scss';

export enum LoaderSizes {
  s = 10,
  xxl = 48,
}

interface LoaderProps {
  size?: LoaderSizes;
}

export const Loader = ({ size }: LoaderProps) => {
  return (
    <PulseLoader
      className={styles.loader}
      loading={true}
      size={size || LoaderSizes.s}
    />
  );
};
