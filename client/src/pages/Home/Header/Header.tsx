import { useMousePosition } from '../../../hooks/useMousePosition';

import styles from './Header.module.scss';

export const Header = () => {
  const mousePosition = useMousePosition();

  return (
    <div className={styles.imageWrapper}>
      <div
        className={styles.image}
        style={{
          transform: `translate(
                            ${mousePosition.x / -50}px, 
                            ${mousePosition.y / -50}px
                          )`,
        }}
      ></div>
    </div>
  );
};
