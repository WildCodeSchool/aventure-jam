import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";

const Step = async () => {
  const apiResult = await fetch(apiRoutes.STEP(1, 1));
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
