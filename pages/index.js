import CityButtonList from '../components/city/CityButtonList';
import PageLayout from '../components/layout/PageLayout';
import { SUPPORTED_CITIES } from '../constants/cities';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <PageLayout title="Home">
      <section className={styles.intro} aria-labelledby="home-title">
        <p className={styles.eyebrow}>Weather Forecast</p>
        <h1 id="home-title" className={styles.title}>
          City Weather
        </h1>
      </section>

      <section aria-label="Supported cities">
        <CityButtonList cities={SUPPORTED_CITIES} />
      </section>
    </PageLayout>
  );
}
