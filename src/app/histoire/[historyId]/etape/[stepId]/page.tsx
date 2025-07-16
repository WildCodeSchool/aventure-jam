import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";
import { ChoiceModel } from "@/model/ChoiceModel";
import dynamic from "next/dynamic";
import NoBackNavigation from "@/components/NoBackNavigation";

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
    <>
      <NoBackNavigation />
      <section className={styles.globalBody}>
        <img
          className={styles.dinamicBackground}
          src={step.background}
          alt={step.id}
        />
        <Inventory historyId={historyId} />
        <section className={styles.etapeBody}>
          <div className={styles.mainEtapeTitle}>
            <div
              className={styles.stepTextContainer}
              dangerouslySetInnerHTML={{ __html: step.text }}
            />
            <div className={styles.ChoiceList}>
              <ul className={styles.ChoiceCase}>
                {choices.map((choice) => (
                  <li key={choice.id} className={styles.choiceStyle}></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Step;
