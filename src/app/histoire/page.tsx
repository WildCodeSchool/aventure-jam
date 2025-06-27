import { apiRoutes } from "@/data/ROUTES";
import styles from "./histoire.module.css";
import Link from "next/link";

const History = async () => {
  const apiResult = await fetch(apiRoutes.HISTORY(1));
  const history = await apiResult.json();

  return (
    <section className={styles.historyBody}>
      <div className={styles.accueilSection}>
        <Link href="/">
          <img
            className={styles.linkAccueil}
            src="/images/9713317.png"
            alt=" aller vers accueil"
          />
        </Link>
      </div>
      <div className={styles.mainTitle}>
        <h2>{history.title}</h2>
        <p>{history.description}</p>
      </div>
    </section>
  );
};
export default History;
