import Link from "next/link";
import styles from "./page.module.css";
import Login from "@/ui/login"

const Home = () => {
  return (
    <>
      <section className={styles.homeBody}>
        <div className={styles.mainTitle}>
          <h1>HISTOIRE INTERACTIVE</h1>

          <Link className={styles.linkHistory} href="/history">
            <img
              className={styles.buttonHistory}
              src="/images/16262430.png"
              alt="lien vers histoire"
            />
          </Link>
          <Login />
        </div>
        <div className={styles.aboutSection}>
          <Link href="/a-propos">
            <img
              className={styles.linkAbout}
              src="/images/9195785.png"
              alt="lien vers about"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;