import styles from "./page.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.mainTitle}>
        <h1>Interactive History</h1>
        <button className={styles.linkHistory}>HISTOIRE</button>
      </div>
      <div className={styles.aboutSection}>
        <a href="/a-propos">
          <img className={styles.linkAbout} src="images/9195785.png" alt="" />
        </a>
      </div>
    </>
  );
};

export default Home;
