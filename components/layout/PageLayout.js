import Head from 'next/head';
import styles from './PageLayout.module.css';

const PageLayout = ({ title = 'Weather Forecast', description, children }) => {
  const pageTitle = `${title} | Weather Forecast`;
  const metaDescription =
    description || 'Weather forecast information by selected city.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default PageLayout;
