"use client";

import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerHome}>
      <Link href="/">
        <img
          src="/Logo/tourAccueil.png"
          alt="Aller vers accueil"
          className={styles.logo}
        />
      </Link>
    </header>
  );
};

export default Header;
