import styles from "./history.module.css";
import Link from "next/link";

const History = () => {
  return (
    <section className={styles.replaceBody}>
      <div className={styles.accueilSection}>
        <Link href="/">
          <img
            className={styles.linkAccueil}
            src="images/9713317.png"
            alt=" lien vers accueil"
          />
        </Link>
      </div>
      <div className={styles.keepCalm}>
        <h2>Histoire</h2>
        <p>C'est ici que tout commence.....</p>
        <p>creation de l'histoire en attente.</p>
      </div>
    </section>
  );
};
export default History;
