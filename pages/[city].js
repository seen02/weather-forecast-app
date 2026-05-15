import PageLayout from '../components/layout/PageLayout';
import { getCityByName, SUPPORTED_CITIES } from '../constants/cities';
import styles from '../styles/CityDetail.module.css';

const CityDetailPage = ({ city }) => {
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
        <article className={styles.panel}>
          <h2 className={styles.panelTitle}>Current Weather</h2>
          <p className={styles.placeholder}>--</p>
        </article>

        <article className={styles.panel}>
          <h2 className={styles.panelTitle}>5 Day Forecast</h2>
          <p className={styles.placeholder}>--</p>
        </article>
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
