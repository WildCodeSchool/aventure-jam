import Header from "@/components/Header";
import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <Header />
      <section className={styles.aboutBody}>
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>A Propos</h2>
          <div>
            <p className={styles.aboutTexte}>
              Bienvenue dans un monde où ton histoire prend vie. Ce projet est
              une invitation à vivre une aventure interactive, en solo, où
              chaque choix a son importance.
              <br />
              Ici, on parle de récits captivants, de décisions cruciales, de
              chemins qui se dessinent au fil de tes actions.
              <br />
              Conçu comme un croisement entre jeu de rôle narratif et
              application web moderne, notre projet propose une expérience
              accessible et fluide.
              <br />
              Que tu sois là pour quelques minutes ou pour t’y perdre des
              heures, tu trouveras toujours un nouveau chapitre à explorer.
              <br />
              C’est un projet né d’une passion pour le storytelling et le
              développement, imaginé et réalisé par un trio de développeurs en
              formation à la Wild Code School.
              <br />
              Prends une grande inspiration. Le monde que tu t’apprêtes à
              découvrir n’attend que toi.
            </p>
          </div>
        </section>
        <ul className={styles.linkendINButton}>
          <li>
            <a
              href="https://www.linkedin.com/in/jerome-marbach-a97707359/"
              target="blank"
            >
              <img
                className={styles.linkJerome}
                src="/images/1745495175558.jpg"
                alt="lien vers linkedIn Jerome"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/maxence-agullo-96003235a/"
              target="blank"
            >
              <img
                className={styles.linkMaxence}
                src="/Logo/9131529.png"
                alt="lien vers linkendin Maxence"
              />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default About;
