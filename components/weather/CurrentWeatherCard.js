import {
  formatPreciseTemperature,
  formatWindSpeed,
  formatWeatherDateTime,
} from '../../utils/weather';
import styles from './CurrentWeatherCard.module.css';

const CurrentWeatherCard = ({ city, hasError, isLoading, weather }) => {
  if (isLoading) {
    return (
      <article className={styles.card} aria-labelledby="current-weather-title">
        <h2 id="current-weather-title" className={styles.title}>
          Current Weather
        </h2>
        <p className={styles.statusText}>Loading weather data...</p>
      </article>
    );
  }

  if (hasError) {
    return (
      <article className={styles.card} aria-labelledby="current-weather-title">
        <h2 id="current-weather-title" className={styles.title}>
          Current Weather
        </h2>
        <p className={styles.errorText}>Current weather is unavailable.</p>
      </article>
    );
  }

  if (!weather) {
    return (
      <article className={styles.card} aria-labelledby="current-weather-title">
        <h2 id="current-weather-title" className={styles.title}>
          Current Weather
        </h2>
        <p className={styles.statusText}>No current weather data.</p>
      </article>
    );
  }

  return (
    <article className={styles.card} aria-labelledby="current-weather-title">
      <div className={styles.icon} aria-hidden="true">
        Weather
        <br />
        icon
      </div>

      <div className={styles.cityInfo}>
        <p className={styles.measuredAt}>{formatWeatherDateTime(weather.measuredAt)}</p>
        <h2 id="current-weather-title" className={styles.city}>
          {city.displayName}, {city.countryCode}
          <span className={styles.population}>(인구수 : {city.population})</span>
        </h2>
      </div>

      <div className={styles.temperatureGroup}>
        <p className={styles.temperature}>
          {formatPreciseTemperature(weather.temperature)}
        </p>
        <p className={styles.description}>
          Feels like {formatPreciseTemperature(weather.feelsLike)} {weather.description}{' '}
          풍속 {formatWindSpeed(weather.windSpeed)} 습도 {weather.humidity}%
        </p>
      </div>
    </article>
  );
};

export default CurrentWeatherCard;
