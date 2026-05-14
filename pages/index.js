import PageLayout from '../components/layout/PageLayout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <PageLayout title="Home">
      <section className={styles.intro} aria-labelledby="home-title">
        <p className={styles.eyebrow}>Weather Forecast</p>
        <h1 id="home-title" className={styles.title}>
          Seoul, Tokyo, Paris, London
        </h1>
      </section>
    </PageLayout>
  );
}
