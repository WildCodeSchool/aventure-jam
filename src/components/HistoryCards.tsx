"use client";

import { appRoutes } from "@/data/ROUTES";
import styles from "./HistoryCards.module.css";
import { getAllHistories } from "@/service/AventureService";
import { HistoryModel } from "@/model/HistoryModel";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const HistoryCards = () => {
  const [histories, setHistories] = useState<HistoryModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const data = await getAllHistories();
        const normalized = Array.isArray(data) ? data : [data];
        setHistories(normalized);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement de l' histoire";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistories();
  }, []);

  if (isloading) {
    return (
      <div className={styles.loading}>
        <p>chargement des histoires ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Erreur: {error}</p>
      </div>
    );
  }

  return (
    <>
      <h2 className={styles.histoiryMainTitle}>Choisis une Histoire</h2>
      <div className={styles.historyContainer}>
        {histories.map((history) => (
          <Link
            key={history.id}
            href={appRoutes.HISTORY(history.id)}
            className={styles.historyCard}
          >
            <h2 className={styles.historyTitle}>{history.title}</h2>
            <p className={styles.historyDescription}>{history.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
};
