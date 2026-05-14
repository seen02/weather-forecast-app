import PageLayout from '../components/layout/PageLayout';
import { SUPPORTED_CITIES } from '../constants/cities';
import styles from '../styles/Home.module.css';

export default function Home() {
  const cityNames = SUPPORTED_CITIES.map((city) => city.displayName).join(', ');

  return (
    <PageLayout title="Home">
      <section className={styles.intro} aria-labelledby="home-title">
        <p className={styles.eyebrow}>Weather Forecast</p>
        <h1 id="home-title" className={styles.title}>{cityNames}</h1>
      </section>
    </PageLayout>
  );
}
