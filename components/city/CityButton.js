import Link from 'next/link';
import styles from './CityButton.module.css';

const CityButton = ({ city }) => {
  return (
    <Link href={city.path}>
      <a className={styles.button}>
        <span className={styles.name}>{city.displayName}</span>
        <span className={styles.country}>{city.countryCode}</span>
      </a>
    </Link>
  );
};

export default CityButton;
