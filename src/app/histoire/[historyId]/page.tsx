import { apiRoutes, appRoutes } from "@/data/ROUTES";
import HistoryStart from "@/components/HistoryStart";
import styles from "./histoire.module.css";
import { HistoryModel } from "@/model/HistoryModel";

type Props = {
  params: {
    historyId: number;
  };
};

const History = async ({ params }: Props) => {
  const { historyId } = await params;

  try {
    const apiResult = await fetch(apiRoutes.HISTORY(historyId));
    if (!apiResult.ok) {
      throw new Error(`Failed to fetch history: ${apiResult.status}`);
    }
    const history: HistoryModel = await apiResult.json();

    return (
      <section className={styles.historyBody}>
        <div className={styles.mainTittle}>
          <HistoryStart historyId={historyId} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Erreur lors du chargement de l'histoire :", error);
    return (
      <section className={styles.historyBody}>
        <div className={styles.mainTitle}>
          <h2>Erreur</h2>
          <p>Impossible de charger cette histoire.</p>
        </div>
      </section>
    );
  }
};
export default History;
