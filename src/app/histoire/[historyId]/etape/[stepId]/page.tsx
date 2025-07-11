import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";
import Link from "next/link";
import { ChoiceModel } from "@/model/ChoiceModel";

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
    <section className={styles.globalBody}>
      <img
        className={styles.dinamicBackground}
        src={step.background}
        alt={step.id}
      />
      <div className={styles.accueilSection}>
        <Link href="/">
          <img
            className={styles.linkAccueil}
            src="/Logo/9713317.png"
            alt=" aller vers accueil"
          />
        </Link>
      </div>
      <div className={styles.mainEtapeTitle}>
        <div
          className={styles.stepTextContainer}
          dangerouslySetInnerHTML={{ __html: step.text }}
        />
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
