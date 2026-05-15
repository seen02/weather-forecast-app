import CityButtonList from '../components/city/CityButtonList';
import PageLayout from '../components/layout/PageLayout';
import { SUPPORTED_CITIES } from '../constants/cities';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <PageLayout title="Home">
      <section className={styles.page} aria-labelledby="home-title">
        <div className={styles.titleGroup}>
          <h1 id="home-title" className={styles.title}>
            <span>Welcome to</span>
            <span className={styles.titleAccent}>Weather App!</span>
          </h1>
          <p className={styles.description}>
            Choose a city from the list below to check the weather.
          </p>
        </div>

        <nav className={styles.cityNav} aria-label="Supported cities">
          <CityButtonList cities={SUPPORTED_CITIES} />
        </nav>

        <div className={styles.heroImage} aria-hidden="true">
          <div className={styles.cloudLeft} />
          <div className={styles.cloudRight} />
          <div className={styles.globe}>🌍</div>
          <div className={styles.cloudBottom} />
        </div>
      </section>
    </PageLayout>
  );
}
