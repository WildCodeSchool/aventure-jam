import styles from "./page.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.mainTitle}>
        <h1>Interactive History</h1>
        <button className={styles.linkHistory}>HISTOIRE</button>
      </div>
    </>
  );
};

export default Home;
