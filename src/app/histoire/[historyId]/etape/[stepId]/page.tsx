import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";

type Props = {
  params: {
    historyId: number;
    stepId: number;
  };
};

const Step = async ({ params }: Props) => {
  const { historyId, stepId } = await params;
  const apiResult = await fetch(apiRoutes.STEP(historyId, stepId));
  const step = await apiResult.json();

  return (
    <section className={styles.etapeBody}>
      <div className={styles.mainEtapeTitle}>
        <p>{step.texte}</p>
      </div>
    </section>
  );
};

export default Step;
