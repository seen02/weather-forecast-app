import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/">
          <a className={styles.brand}>Weather Forecast</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
