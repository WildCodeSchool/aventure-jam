import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";
import Link from "next/link";

type Props = {
  params: {
    historyId: number;
    stepId: number;
    choicesId: number;
  };
};

const Step = async ({ params }: Props) => {
  const { historyId, stepId } = await params;
  const apiStepResult = await fetch(apiRoutes.STEP(historyId, stepId));
  const step = await apiStepResult.json();
  const apiChoicesResult = await fetch(apiRoutes.CHOICES(historyId, stepId));
  const choices = await apiChoicesResult.json();

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
          <ul>
            <li>
              <Link href="">{choices.texte}</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Step;
