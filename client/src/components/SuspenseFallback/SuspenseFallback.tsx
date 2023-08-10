import { Loader, LoaderSizes } from '../global/Loader/Loader';
import styles from './SuspenseFallback.module.scss';

export const SuspenseFallback = () => {
  return (
    <div className={styles.page} data-testid='page__suspense-fallback'>
      <Loader size={LoaderSizes.xxl} testId={'suspense-fallback'} />
    </div>
  );
};
