import { apiRoutes } from "@/data/ROUTES";
import styles from "./etape.module.css";
import { ChoiceModel } from "@/model/ChoiceModel";
import { StepModel } from "@/model/StepModel";
import ButtonToValidate from "@/components/ButtonValidation";
import SaveStepProgress from "@/components/SaveStepProgress";
import dynamic from "next/dynamic";
import NoBackNavigation from "@/components/NoBackNavigation";

const Inventory = dynamic(() => import("@/ui/Inventory"));

interface Props {
  params: {
    historyId: number;
    stepId: number;
  };
}

const Step = async ({ params }: Props) => {
  const { historyId, stepId } = await params;

  try {
    const [apiStepResult, apiChoicesResult] = await Promise.all([
      fetch(apiRoutes.STEP(historyId, stepId)),
      fetch(apiRoutes.CHOICES(historyId, stepId)),
    ]);

    if (!apiStepResult.ok || !apiChoicesResult.ok) {
      throw new Error("Erruer lors du chargement de l'étape ou des choix");
    }

    const step: StepModel = await apiStepResult.json();
    const choices: ChoiceModel[] = await apiChoicesResult.json();

    return (
      <>
        <NoBackNavigation />
        <SaveStepProgress historyId={historyId} stepId={stepId} />
        <section className={styles.globalBody}>
          <img
            className={styles.dinamicBackground}
            src={step.background}
            alt={`Étape ${step.id}`}
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
                      objectId={choice.objectId}
                      takeOrGive={choice.takeOrGive}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Erreur lors du chargement de l'étape :", error);
    return (
      <section className={styles.globalBody}>
        <div className={styles.mainEtapeTitle}>
          <h2>Erreur</h2>
          <p>Impossible de charger cette étape.</p>
        </div>
      </section>
    );
  }
};

export default Step;
