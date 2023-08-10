import { Loader, LoaderSizes } from '../global/Loader/Loader';
import styles from './SuspenseFallback.module.scss';

export const SuspenseFallback = () => {
  return (
    <div className={styles.page}>
      <Loader size={LoaderSizes.xxl} />
    </div>
  );
};
