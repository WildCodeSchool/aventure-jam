"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./ButtonValidation.module.css";
import { addInventory, deleteInventories } from "@/service/AventureService";

type Props = {
  link: string;
  label: string;
  objectId: number;
  takeOrGive: number | null;
};

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
    }

    setProgress(0);
  };

  const handleStart = () => {
    startTimeRef.current = Date.now();

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - (startTimeRef.current || 0);
      setProgress(Math.min(elapsed / duration, 1));
    }, 16);

    timeoutRef.current = window.setTimeout(() => {
      clearTimers();
      try {
        const email = session?.user?.email;
        const historyId = Number(params.historyId);

        if (email && historyId && objectId !== null) {
          if (takeOrGive && takeOrGive === 0) {
            addInventory(email, historyId, objectId);
          } else if (takeOrGive && takeOrGive === 1) {
            deleteInventories(email, historyId, [objectId])
          } else {
            return
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout à l'inventaire :", error);
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
