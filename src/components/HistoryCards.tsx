"use client";

import { appRoutes } from "@/data/ROUTES";
import styles from "./HistoryCards.module.css";
import { getAllHistories } from "@/service/AventureService";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const HistoryCards = () => {
  const [histories, setHistories] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const data = await getAllHistories();
        const normalized = Array.isArray(data) ? data : [data];

        setHistories(normalized);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des histoires");
      }
    };

    fetchHistories();
  }, []);

  return (
    <>
      {histories.map((history) => (
        <div key={history.id} className={styles.historyCard}>
          <h2 className={styles.historyTitle}>{history.title}</h2>
          <p className={styles.historyDescription}>{history.description}</p>
          <Link
            href={
              history.id == 2
                ? appRoutes.STEP(history.id, 24)
                : appRoutes.STEP(history.id, 1)
            }
            className={styles.historyButton}
          >
            Entrer dans l&apos;histoire
          </Link>
        </div>
      ))}
    </>
  );
};
