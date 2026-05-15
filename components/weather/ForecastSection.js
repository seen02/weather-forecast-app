import ForecastCard from './ForecastCard';
import styles from './ForecastSection.module.css';

const ForecastSection = ({ forecasts, hasError, isLoading }) => {
  if (isLoading) {
    return (
      <article className={styles.section} aria-labelledby="forecast-title">
        <h2 id="forecast-title" className={styles.title}>
          5 Day Forecast
        </h2>
        <p className={styles.statusText}>Loading forecast data...</p>
      </article>
    );
  }

  if (hasError) {
    return (
      <article className={styles.section} aria-labelledby="forecast-title">
        <h2 id="forecast-title" className={styles.title}>
          5 Day Forecast
        </h2>
        <p className={styles.errorText}>Forecast is unavailable.</p>
      </article>
    );
  }

  if (!forecasts.length) {
    return (
      <article className={styles.section} aria-labelledby="forecast-title">
        <h2 id="forecast-title" className={styles.title}>
          5 Day Forecast
        </h2>
        <p className={styles.statusText}>No forecast data.</p>
      </article>
    );
  }

  return (
    <article className={styles.section} aria-labelledby="forecast-title">
      <h2 id="forecast-title" className={styles.title}>
        5 Day Forecast
      </h2>
      <ul className={styles.list}>
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.dateKey} forecast={forecast} />
        ))}
      </ul>
    </article>
  );
};

export default ForecastSection;
