import { apiRoutes, appRoutes } from "@/data/ROUTES";
import styles from "./histoire.module.css";
import Link from "next/link";

type Props = {
  params: {
    historyId: number;
  };
};

const History = async ({ params }: Props) => {
  const { historyId } = await params;
  const apiResult = await fetch(apiRoutes.HISTORY(historyId));
  const history = await apiResult.json();

  return (
    <section className={styles.historyBody}>
      <div className={styles.accueilSection}>
        <Link href="/">
          <img
            className={styles.linkAccueil}
            src="/Logo/tourAccueil.png"
            alt=" aller vers accueil"
          />
        </Link>
      </div>
      <div className={styles.mainTitle}>
        <h2>{history.title}</h2>
        <p>{history.description}</p>
        <div className={styles.nextStepLink}>
          <Link href={appRoutes.STEP(historyId, 1)}>
            <img src="/Logo/img.icons8.png" />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default History;
