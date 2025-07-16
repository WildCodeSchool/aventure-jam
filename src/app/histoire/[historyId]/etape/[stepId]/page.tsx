import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";
import Link from "next/link";
import { ChoiceModel } from "@/model/ChoiceModel";
import ButtonToValidate from "@/components/ButtonValidation";
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
    <section className={styles.globalBody}>
      <img
        className={styles.dinamicBackground}
        src={step.background}
        alt={step.id}
      />
      <div className={styles.accueilSection}>
        <Inventory historyId={historyId} />
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
                <ButtonToValidate
                  link={
                    choice.linkToStepId === 0
                      ? "/"
                      : `/histoire/${historyId}/etape/${choice.linkToStepId}`
                  }
                  label={choice.text}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Step;
