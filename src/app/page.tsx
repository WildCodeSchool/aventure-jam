import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.mainTitle}>
        <h1>Interactive History</h1>
        <button className={styles.linkHistory}>
          <Link href="/history">
            <img className={styles.buttonHistory} src="" alt="" />
            HISTORY
          </Link>
        </button>
      </div>
      <div className={styles.aboutSection}>
        <Link href="/a-propos">
          <img className={styles.linkAbout} src="images/9195785.png" alt="" />
        </Link>
      </div>
    </>
  );
};

export default Home;
