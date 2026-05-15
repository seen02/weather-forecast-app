import { formatForecastDate } from '../../utils/forecast';
import { formatTemperature, formatWindSpeed } from '../../utils/weather';
import styles from './ForecastCard.module.css';

const ForecastCard = ({ forecast }) => {
  return (
    <li className={styles.card}>
      <div>
        <p className={styles.date}>{formatForecastDate(forecast.dateTime)}</p>
        <p className={styles.description}>{forecast.description}</p>
      </div>

      <dl className={styles.weatherList}>
        <div className={styles.weatherItem}>
          <dt>Temp</dt>
          <dd>
            {formatTemperature(forecast.minTemperature)} /{' '}
            {formatTemperature(forecast.maxTemperature)}
          </dd>
        </div>
        <div className={styles.weatherItem}>
          <dt>Humidity</dt>
          <dd>{forecast.humidity}%</dd>
        </div>
        <div className={styles.weatherItem}>
          <dt>Wind</dt>
          <dd>{formatWindSpeed(forecast.windSpeed)}</dd>
        </div>
      </dl>
    </li>
  );
};

export default ForecastCard;
