"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Login from "@/ui/login";
import { appRoutes } from "@/data/ROUTES";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "@/ui/Modal";

const Home = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProtectedClick = () => {
    setIsModalOpen(true);
  };
  console.log(isModalOpen);
  return (
    <>
      <section className={styles.homeBody}>
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
        <div className={styles.aboutSection}>
          <Link href="/a-propos">
            <img
              className={styles.linkAbout}
              src="/Logo/aboutLogo.png"
              alt="aller vers about"
            />
          </Link>
        </div>
      </section>
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

export default Home;
