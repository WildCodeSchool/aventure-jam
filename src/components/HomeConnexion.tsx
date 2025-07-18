"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Modal from "@/ui/Modal";
import Login from "@/ui/login";
import { appRoutes } from "@/data/ROUTES";
import styles from "@/app/page.module.css";

const Homeconnexion = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProtectedClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.mainTitle}>
        <h1>HISTOIRE INTERACTIVE</h1>
        {session ? (
          <Link className={styles.linkHistory} href={appRoutes.HISTORY(1)}>
            LANCER HISTOIRE
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleProtectedClick}
            className={styles.linkHistory}
          >
            LANCER HISTOIRE
          </button>
        )}
        <div className={styles.googleButton}>
          <Login />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onLogin={() => {
            signIn("google");
          }}
        />
      )}
    </>
  );
};

export default Homeconnexion;
