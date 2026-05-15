import { formatForecastTime } from '../../utils/forecast';
import { formatPreciseTemperature } from '../../utils/weather';
import styles from './ForecastCard.module.css';

const ForecastCard = ({ forecast }) => {
  return (
    <li className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        Weather
        <br />
        icon
      </div>

      <p className={styles.time}>{formatForecastTime(forecast.dateTime)}</p>

      <div className={styles.weather}>
        <p className={styles.description}>{forecast.description}</p>
        <p className={styles.temperature}>
          {formatPreciseTemperature(forecast.temperature)} /{' '}
          {formatPreciseTemperature(forecast.temperature)}
        </p>
      </div>
    </li>
  );
};

export default ForecastCard;
