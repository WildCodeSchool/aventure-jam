import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";

const Step = async () => {
  const apiResult = await fetch(apiRoutes.STEP(1, 1));
  const steps = await apiResult.json();

  return (
    <section className={styles.etapeBody}>
      <div className={styles.mainEtapeTitle}>
        <p>{steps.texte}</p>
      </div>
    </section>
  );
};

export default Step;
