import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";
import Link from "next/link";

type Props = {
  params: {
    historyId: number;
    stepId: number;
  };
};

const Step = async ({ params }: Props) => {
  const { historyId, stepId } = await params;
  const toNextStep = Number(stepId);
  const toPreviewStep = Number(stepId);
  const apiResult = await fetch(apiRoutes.STEP(historyId, stepId));
  const step = await apiResult.json();

  return (
    <section className={styles.etapeBody}>
      <div className={styles.accueilSection}>
        <Link href="/">
          <img
            className={styles.linkAccueil}
            src="/images/9713317.png"
            alt=" aller vers accueil"
          />
        </Link>
      </div>
      <div className={styles.mainEtapeTitle}>
        <p>{step.texte}</p>
        <div className={styles.nextPage}>
          <Link href={`/histoire/${historyId}/etape/${toNextStep + 1}`}>
            Etape suivante
          </Link>
          <Link href={`/histoire/${historyId}/etape/${toPreviewStep - 1}`}>
            Etape precedente
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Step;
