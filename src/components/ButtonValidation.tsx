"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./ButtonValidation.module.css";
import {
  addInventory,
  deleteInventories,
  fetchInventoryForHistory,
} from "@/service/AventureService";
import {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
} from "@/service/ProgressService";

interface Props {
  link: string;
  label: string;
  objectId: number;
  takeOrGive: number | null;
}

const ButtonToValidate = ({ link, label, objectId, takeOrGive }: Props) => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 1000;

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setProgress(0);
  };

  const saveProgress = async (nextStepId: number) => {
    if (!session?.user?.email) return;

    const email = session.user.email;
    const historyId = Number(params.historyId);

    try {
      const existingProgress = await getProgress(email, historyId);

      if (existingProgress) {
        await updateProgress(email, historyId, nextStepId, objectId);
      } else {
        await createProgress(email, historyId, nextStepId, objectId);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la progression :", error);
    }
  };

  const handleStart = () => {
    startTimeRef.current = Date.now();

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - (startTimeRef.current || 0);
      setProgress(Math.min(elapsed / duration, 1));
    }, 16);

    timeoutRef.current = window.setTimeout(async () => {
      clearTimers();

      try {
        const email = session?.user?.email;
        const historyId = Number(params.historyId);

        if (email && historyId) {
          if (objectId !== null && takeOrGive !== null) {
            if (takeOrGive === 0) {
              await addInventory(email, historyId, objectId);
            } else if (takeOrGive === 1) {
              await deleteInventories(email, historyId, [objectId]);
            }
          }

          if (link === "/") {
            const inventory = await fetchInventoryForHistory(email, historyId);
            if (Array.isArray(inventory) && inventory.length > 0) {
              const objectIds = inventory.map((item) => item.object_id);
              await deleteInventories(email, historyId, objectIds);
            }

            await deleteProgress(email, historyId);
          } else {
            const nextStepMatch = link.match(/\/etape\/(\d+)/);
            if (nextStepMatch) {
              const nextStepId = parseInt(nextStepMatch[1]);
              await saveProgress(nextStepId);
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors du traitement du bouton :", error);
      }

      router.push(link);
    }, duration);
  };

  const handleEnd = () => {
    clearTimers();
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <button
      className={styles.choiceButton}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      data-progress={progress}
    >
      <span className={styles.buttonLabel}>{label}</span>
    </button>
  );
};

export default ButtonToValidate;
