import CityButton from './CityButton';
import styles from './CityButtonList.module.css';

const CityButtonList = ({ cities }) => {
  return (
    <ul className={styles.list}>
      {cities.map((city) => (
        <li key={city.id} className={styles.item}>
          <CityButton city={city} />
        </li>
      ))}
    </ul>
  );
};

export default CityButtonList;
