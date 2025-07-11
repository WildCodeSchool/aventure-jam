import { apiRoutes } from "@/data/ROUTES";
import styles from "./history.module.css";
import Link from "next/link";

const History = async () => {
  const apiResult = await fetch(apiRoutes.HISTORY(1));
  const history = await apiResult.json();

  return (
    <section className={styles.replaceBody}>
      <div className={styles.accueilSection}>
        <Link href="/">
          <img
            className={styles.linkAccueil}
            src="/Logo/9713317.png"
            alt=" aller vers accueil"
          />
        </Link>
      </div>
      <div className={styles.keepCalm}>
        <h2>{history.title}</h2>
        <p>{history.description}</p>
      </div>
    </section>
  );
};
export default History;
