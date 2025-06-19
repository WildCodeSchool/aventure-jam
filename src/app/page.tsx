import styles from "./page.module.css";
import About from "./a-propos/pages";

const Home = () => {
  return (
    <>
      <div className={styles.mainTitle}>
        <h1>Interactive History</h1>
        <button className={styles.linkHistory}>HISTOIRE</button>
      </div>
      <div className={styles.aboutSection}>
        <a href="src/app/a-propos/pages.tsx">
          <img className={styles.linkAbout} src="images/9195785.png" alt="" />
        </a>
      </div>
    </>
  );
};

export default Home;
