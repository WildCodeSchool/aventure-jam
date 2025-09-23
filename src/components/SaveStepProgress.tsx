"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  getProgress,
  createProgress,
  updateProgress,
} from "@/service/ProgressService";

interface Props {
  historyId: number;
  stepId: number;
}

const SaveStepProgress = ({ historyId, stepId }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    const saveCurrentStep = async () => {
      if (!session?.user?.email) return;

      try {
        const existingProgress = await getProgress(
          session.user.email,
          historyId
        );

        if (existingProgress) {
          if (existingProgress.step_id !== stepId) {
            await updateProgress(session.user.email, historyId, stepId);
          }
        } else {
          await createProgress(session.user.email, historyId, stepId);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la sauvegarde de l'étape actuelle :",
          error
        );
      }
    };

    saveCurrentStep();
  }, [session, historyId, stepId]);

  return null;
};

export default SaveStepProgress;
