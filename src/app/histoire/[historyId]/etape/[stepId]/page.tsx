import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";
import Link from "next/link";
import { ChoiceModel } from "@/model/ChoiceModel";
import dynamic from "next/dynamic";
const Inventory = dynamic(() => import("@/ui/Inventory"));

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
  const choices: ChoiceModel[] = await apiChoicesResult.json();

  return (
    <section className={styles.etapeBody}>
      <div className={styles.accueilSection}>
        <Link href="/">
          <img
            className={styles.linkAccueil}
            src="/Logo/9713317.png"
            alt=" aller vers accueil"
          />
        </Link>
        <Inventory
          historyId={historyId}
        />
      </div>
      <div className={styles.mainEtapeTitle}>
        <p>{step.text}</p>
        <div className={styles.ChoiceList}>
          <ul className={styles.ChoiceCase}>
            {choices.map((choice) => (
              <li key={choice.id} className={styles.choiceStyle}>
                <Link
                  href={
                    choice.linkToStepId === 0
                      ? "/"
                      : `/histoire/${historyId}/etape/${choice.linkToStepId}`
                  }
                >
                  {choice.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Step;
