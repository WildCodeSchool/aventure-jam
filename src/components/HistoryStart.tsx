"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProgress } from "@/service/ProgressService";
import { appRoutes, apiRoutes } from "@/data/ROUTES";
import styles from "./HistoryStart.module.css";
import { HistoryModel } from "@/model/HistoryModel";

interface Props {
  historyId: number;
}

const HistoryStart = ({ historyId }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const checkProgressAndRedirect = async () => {
      if (!session?.user?.email) {
        setIsloading(false);
        return;
      }

      try {
        const historyResponse = await fetch(apiRoutes.HISTORY(historyId));
        if (!historyResponse.ok) {
          throw new Error("Histoire non trouvée");
        }

        const history: HistoryModel = await historyResponse.json();
        const firstStepId = history.first_step_id || 1;

        const progress = await getProgress(session.user.email, historyId);

        if (progress && progress.step_id) {
          router.push(appRoutes.STEP(historyId, progress.step_id));
        } else {
          router.push(appRoutes.STEP(historyId, firstStepId));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la verification de la progression:",
          error
        );
        router.push(appRoutes.STEP(historyId, 1));
      }
    };

    if (session !== undefined) {
      checkProgressAndRedirect();
    }
  }, [session, historyId, router]);

  if (session === undefined || isLoading) {
    return (
      <div className={styles.loading}>
        <img src="/Logo/img_loading.png" alt="chargement..." />
        <p>Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.loginRequired}>
        <p>Vous devez etre connecté pour jouer</p>
      </div>
    );
  }

  return null;
};

export default HistoryStart;
