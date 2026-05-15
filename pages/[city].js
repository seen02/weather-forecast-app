import { useQuery } from '@apollo/client/react';
import PageLayout from '../components/layout/PageLayout';
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard';
import ForecastSection from '../components/weather/ForecastSection';
import { getCityByName, SUPPORTED_CITIES } from '../constants/cities';
import { WEATHER_BY_CITY_QUERY } from '../graphql/queries';
import styles from '../styles/CityDetail.module.css';
import { getDailyForecasts } from '../utils/forecast';

const CityDetailPage = ({ city }) => {
  const { data, error, loading } = useQuery(WEATHER_BY_CITY_QUERY, {
    variables: {
      city: city.name,
    },
  });
  const weather = data?.weatherByCity;
  const currentWeather = weather?.current;
  const dailyForecasts = getDailyForecasts(weather?.forecast);

  return (
    <PageLayout
      title={city.displayName}
      description={`${city.displayName} weather forecast information.`}
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>{city.countryCode}</p>
        <h1 className={styles.title}>{city.displayName}</h1>
      </header>

      <section className={styles.grid} aria-label={`${city.displayName} weather`}>
        <CurrentWeatherCard
          hasError={Boolean(error)}
          isLoading={loading}
          weather={currentWeather}
        />
        <ForecastSection
          forecasts={dailyForecasts}
          hasError={Boolean(error)}
          isLoading={loading}
        />
      </section>
    </PageLayout>
  );
};

export const getStaticPaths = () => {
  return {
    paths: SUPPORTED_CITIES.map((city) => ({
      params: {
        city: city.name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const city = getCityByName(params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
    },
  };
};

export default CityDetailPage;
