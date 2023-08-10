import { PulseLoader } from 'react-spinners';

import styles from './Loader.module.scss';

export enum LoaderSizes {
  s = 10,
  xxl = 48,
}

interface LoaderProps {
  size?: LoaderSizes;
  testId?: string;
}

export const Loader = ({ size, testId = '' }: LoaderProps) => {
  return (
    <PulseLoader
      className={styles.loader}
      data-testid={`loader__${testId}`}
      loading={true}
      size={size || LoaderSizes.s}
    />
  );
};
