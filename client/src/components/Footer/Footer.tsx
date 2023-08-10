import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>&copy; Pokemons</p>
    </footer>
  );
};
