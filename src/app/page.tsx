import Link from "next/link";
import styles from "./page.module.css";
import Homeconexion from "@/components/HomeConnexion";

const Home = () => {
  return (
    <>
      <section className={styles.homeBody}>
        <Homeconexion />
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
