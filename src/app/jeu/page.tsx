import styles from "./page.module.css";

export default function JeuPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <h1>Histoire</h1>
        <p>
          Le royaume d'Élyndor, jadis prospère et paisible, est aujourd'hui menacé. 
          Une ombre grandissante s'étend depuis la Forêt Murmurante, une étendue sylvestre réputée pour ses arbres millénaires et ses secrets oubliés. 
          Des villages isolés aux abords de la forêt ont cessé de donner signe de vie, et des créatures corrompues, jamais vues auparavant, 
          commencent à s'aventurer sur les routes. Le peuple d'Élyndor vit dans la peur, et même les Chevaliers de la Rose, 
          protecteurs du royaume, semblent désemparés face à cette menace insaisissable.
        </p>
      </div>
    </div>
  );
}

