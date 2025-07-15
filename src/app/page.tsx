import Link from "next/link";
import styles from "./page.module.css";
import Login from "@/ui/login";
import { appRoutes } from "@/data/ROUTES";

const Home = () => {
  return (
    <>
      <section className={styles.homeBody}>
        <div className={styles.mainTitle}>
          <h1>HISTOIRE INTERACTIVE</h1>

          <Link className={styles.linkHistory} href={appRoutes.HISTORY(1)}>
            LANCER HISTOIRE
          </Link>
          <div className={styles.googleButton}>
            <Login />
          </div>
        </div>
        <div className={styles.aboutSection}>
          <Link href="/a-propos">
            <img
              className={styles.linkAbout}
              src="/Logo/aboutLogo.png"
              alt="aller vers about"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
