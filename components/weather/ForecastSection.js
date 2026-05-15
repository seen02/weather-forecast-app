import { useState } from 'react';
import ForecastCard from './ForecastCard';
import { formatForecastDate } from '../../utils/forecast';
import styles from './ForecastSection.module.css';

const ForecastSection = ({ forecasts, hasError, isLoading }) => {
  const [openDateKey, setOpenDateKey] = useState('');

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

  const activeDateKey = openDateKey || forecasts[0]?.dateKey;

  return (
    <article className={styles.section} aria-labelledby="forecast-title">
      <header className={styles.header}>
        <h2 id="forecast-title" className={styles.title}>
          5-day Forecast
        </h2>
      </header>

      <ul className={styles.dayList}>
        {forecasts.map((forecastGroup) => {
          const isOpen = forecastGroup.dateKey === activeDateKey;

          return (
            <li key={forecastGroup.dateKey} className={styles.dayItem}>
              <button
                className={styles.dayButton}
                type="button"
                onClick={() =>
                  setOpenDateKey(isOpen ? 'none' : forecastGroup.dateKey)
                }
                aria-expanded={isOpen}
              >
                <span>{formatForecastDate(forecastGroup.dateTime)}</span>
                <span className={styles.arrow} aria-hidden="true" />
              </button>

              {isOpen && (
                <ul className={styles.hourlyList}>
                  {forecastGroup.forecasts.map((forecast) => (
                    <ForecastCard key={forecast.dateTime} forecast={forecast} />
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default ForecastSection;
