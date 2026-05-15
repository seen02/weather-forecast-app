import {
  formatMeasuredTime,
  formatTemperature,
  formatWindSpeed,
} from '../../utils/weather';
import styles from './CurrentWeatherCard.module.css';

const CurrentWeatherCard = ({ hasError, isLoading, weather }) => {
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
      <header className={styles.header}>
        <div>
          <h2 id="current-weather-title" className={styles.title}>
            Current Weather
          </h2>
          <p className={styles.description}>{weather.description}</p>
        </div>
        <p className={styles.temperature}>
          {formatTemperature(weather.temperature)}
        </p>
      </header>

      <dl className={styles.weatherList}>
        <div className={styles.weatherItem}>
          <dt>Feels Like</dt>
          <dd>{formatTemperature(weather.feelsLike)}</dd>
        </div>
        <div className={styles.weatherItem}>
          <dt>Humidity</dt>
          <dd>{weather.humidity}%</dd>
        </div>
        <div className={styles.weatherItem}>
          <dt>Wind</dt>
          <dd>{formatWindSpeed(weather.windSpeed)}</dd>
        </div>
        <div className={styles.weatherItem}>
          <dt>Measured At</dt>
          <dd>{formatMeasuredTime(weather.measuredAt)}</dd>
        </div>
      </dl>
    </article>
  );
};

export default CurrentWeatherCard;
