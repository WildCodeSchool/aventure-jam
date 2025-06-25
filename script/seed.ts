import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const seed = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
      multipleStatements: true,
    });

    await connection.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE TABLE progress;
      TRUNCATE TABLE inventory;
      TRUNCATE TABLE etape_object;
      TRUNCATE TABLE choice;
      TRUNCATE TABLE etape;
      TRUNCATE TABLE history;
      TRUNCATE TABLE object;
      TRUNCATE TABLE users;
      SET FOREIGN_KEY_CHECKS = 1;
    `);

    await connection.execute(
      `INSERT INTO history (id, texte, description) VALUES (?, ?, ?)`,
      [
        1,
        "Les Cendres d'Yrnwald",
        "Une aventure sombre dans un monde dévasté par la Peste Rouge, où tu incarnes un Porte-Marque sans mémoire qui doit refermer la Brèche originelle pour sauver ce qui reste du monde.",
      ]
    );

    const objects = [
      [
        1,
        "Dague cérémonielle",
        "Une lame d'acier sombre striée de runes éteintes, froide au toucher. Elle semble résonner avec la Marque sur ta main.",
        "dague_ceremonielle.jpg",
      ],
      [
        2,
        "Pierre de veillée",
        "Une pierre runique qui pulse d'une lumière bleutée. Elle permet de ressusciter une fois en cas de mort.",
        "pierre_veillee.jpg",
      ],
      [
        3,
        "Anneau de murmures",
        "Un anneau d'argent terni qui permet d'entendre les secrets cachés et les conversations lointaines.",
        "anneau_murmures.jpg",
      ],
      [
        4,
        "Poche d'ombres",
        "Un petit sac de cuir noir qui semble absorber la lumière. Il peut dissimuler un objet ou toi-même.",
        "poche_ombres.jpg",
      ],
      [
        5,
        "Fiole de mémoire",
        "Une fiole de verre contenant un liquide opalescent. Elle renferme un souvenir vivant du passé.",
        "fiole_memoire.jpg",
      ],
      [
        6,
        "Lame d'obsidienne",
        "Une lame de verre volcanique, fragile mais capable de trancher les esprits et les illusions.",
        "lame_obsidienne.jpg",
      ],
      [
        7,
        "Crochet de Brèche",
        "Un artefact métallique qui pulse au rythme de ton cœur. Il est directement lié aux énergies des Brèches.",
        "crochet_breche.jpg",
      ],
      [
        8,
        "Fragment d'os poli",
        "Une clef d'os blanc, lisse comme de l'ivoire. Ce n'est pas une clef pour une porte, mais pour un souvenir enfoui.",
        "fragment_os.jpg",
      ],
      [
        9,
        "Parchemin scellé",
        "Un parchemin ancien scellé par une mèche de tes propres cheveux. À n'ouvrir qu'en dernier recours.",
        "parchemin_scelle.jpg",
      ],
      [
        10,
        "Paquet ensanglanté",
        "Un mystérieux paquet taché de sang séché. Il contenait ton vrai nom, désormais volé.",
        "paquet_sanglant.jpg",
      ],
      [
        11,
        "Lame noire sans reflet",
        "L'arme de ton double, une épée qui n'a aucun reflet. Elle symbolise le choix entre qui tu es et qui tu aurais pu être.",
        "lame_noire.jpg",
      ],
      [
        12,
        "Marque du Porte-Marque",
        "La marque noire brûlée dans ta chair. Un œil fermé entouré de crocs qui pulse comme un cœur battant.",
        "marque_portemarque.jpg",
      ],
    ];
    for (const obj of objects) {
      await connection.execute(
        `INSERT INTO object (id, name, description, image) VALUES (?, ?, ?, ?)`,
        obj
      );
    }

    const etapes = [
      [
        1,
        "Tu ouvres les yeux, étendu sur un sol froid et dur. Autour de toi, des ruines noyées dans une brume cramoisie. L'air sent la chair calcinée et la cendre mouillée. Le ciel est figé, crevé d'un œil rouge qui ne cligne jamais. Tu n'as ni souvenir, ni nom. Juste la sensation aiguë que tu n'es pas censé être là… pas en vie. Tu te redresses lentement, observant la marque noire brûlée dans ta chair : un œil fermé entouré de crocs.",
        1,
        "Morgha la Céciteuse - Une vieille femme drapée d'un manteau de suie, le visage masqué par un bandeau de cuir clouté. Elle semble te connaître.",
        "ruines_brume_cramoisie.jpg",
      ],
      [
        2,
        "Elle te conduit dans les profondeurs d'un sanctuaire à moitié effondré, un ancien Temple des Veilleurs. Là, dans l'obscurité fumeuse, brûle un feu noir, silencieux. Morgha te donne de quoi boire - une eau cendreuse qui te rend un peu de vigueur. Elle t'explique que le monde s'éteint à cause des Brèches ouvertes par la Couronne d'Épine, et que toi seul peux refermer la Brèche originelle car tu portes la Marque.",
        1,
        "Morgha la Céciteuse - Elle semble connaître des secrets sur ton passé et ta destinée.",
        "temple_veilleurs_feu_noir.jpg",
      ],
      [
        3,
        "Morgha te tend une dague cérémonielle et t'explique que tu dois choisir ce que tu es, ce que tu veux devenir. Elle te propose aussi un objet relique pour t'aider dans ta quête. Tu ressens des échos dans ton esprit, des fragments de ce que tu pourrais être, mais tu ne comprends pas encore tout.",
        1,
        "Morgha la Céciteuse - Elle observe tes choix avec attention, comme si elle savait déjà ce que tu vas décider.",
        "sanctuaire_choix_relique.jpg",
      ],
      [
        4,
        "Tu sers la dague contre ta paume. Son contact est froid, presque douloureux. Morgha te regarde longuement et t'explique qu'Yrnwald ne peut plus être sauvé, mais que la Brèche originelle au nord peut être scellée. Dehors, le vent a tourné. L'aube ne vient pas. Sur la carte gravée dans ta mémoire, trois routes apparaissent clairement vers des fragments de vérité.",
        1,
        "Morgha la Céciteuse - Elle te donne ses derniers conseils avant ton départ.",
        "yrnwald_trois_routes.jpg",
      ],
      [
        5,
        "Les arbres de Gräven se referment sur toi comme des os longs et tordus. Le silence y est pesant, troublé seulement par les chuchotements des feuilles mortes qui ne tombent jamais et t'observent. Tu progresses à pas lents, sentant parfois ton reflet marcher à contre-courant sur l'écorce. Une lumière rougeâtre perce le brouillard : un campement avec un autel fait de crânes et de branches.",
        1,
        "Marchand masqué - Vêtu de bandes de cuir et de morceaux d'ossements polis, son visage est caché par un masque rituel. Il vend souvenirs, malédictions et promesses.",
        "foret_graven_marchand.jpg",
      ],
      [
        6,
        "Tu quittes Gräven par l'ancien sentier de pierre, là où la mousse mange les symboles oubliés. Dans ton dos, les arbres se referment lentement - ils n'aiment pas laisser partir ce qu'ils ont vu. La brume devient cendre, le vent porte des éclats de voix. Au loin, une tour solitaire perce la plaine déserte : la Tour du Voile, autrefois phare pour les sentinelles du nord.",
        1,
        "Aucun PNJ - Solitude et mystère dans la plaine désolée.",
        "tour_voile_plaine.jpg",
      ],
      [
        7,
        "À l'intérieur de la tour, la lumière s'éteint d'elle-même. Les murs sont couverts de runes effacées que tu ne peux lire. Un vieillard vêtu de peaux rapiécées, un bandeau couvrant ses yeux, t'attendait. Il ne parle que par symboles et fragments, mais tu comprends qu'il faut éveiller l'un des Trois Dormeurs pour atteindre la Brèche. Il te montre des cartes à moitié brûlées clouées au mur.",
        1,
        "Vieillard aveugle - Sans nom, il ne parle que par symboles. Gardien des secrets des Trois Dormeurs.",
        "tour_vieillard_cartes.jpg",
      ],
      [
        8,
        "La terre elle-même change sous tes pas, devenant poussière. Les oiseaux ne chantent plus. Un cri déchire le silence : un enfant court vers toi à travers la plaine, affolé, tenant un paquet ensanglanté. Il hurle un nom que tu n'as pas entendu depuis longtemps - ton ancien nom. Soudain, la terre s'ouvre sur une Brèche vivante et affamée, ses tentacules d'ombre s'élançant vers vous.",
        1,
        "Enfant affolé - Petit, humain, tenant un mystérieux paquet. Il semble te connaître sous un ancien nom.",
        "plaine_enfant_breche.jpg",
      ],
      [
        9,
        "La route jusqu'aux ruines est silencieuse. Tu traverses une ancienne arche gravée de glyphes réduits à des éraflures. Le sol craque sous tes pas - ce ne sont pas des pierres, mais des os. Ashtorath était autrefois une cité couronnée d'argent, aujourd'hui réduite à des colonnes brisées. Une lueur vacille : la Reine Écorchée t'attend sur son trône de fer fondu, entourée d'ombres agenouillées.",
        1,
        "La Reine Écorchée - Assise sur un trône de fer fondu, entourée d'ombres silencieuses. Elle semble te reconnaître comme un héritier.",
        "ashtorath_reine_ecorchee.jpg",
      ],
      [
        10,
        "La Reine te propose un choix : pour réveiller la porte, il faut du sang - le tien ou le sien. Ses yeux vides s'enfoncent dans les tiens, deux puits affamés. Quand tu fais ton choix, la Marque réagit violemment. Le sol tremble, un pilier noir jaillit du centre du temple brisé avec des chaînes brisées qui tournoient autour. Le premier Dormeur s'éveille avec un cri étouffé mais pas étranger.",
        1,
        "La Reine Écorchée - Elle se dissout lentement après l'éveil, son corps n'était qu'un fragment.",
        "pilier_noir_eveil.jpg",
      ],
      [
        11,
        "Des chaînes de lumière montent vers le ciel, traçant une ligne visible jusqu'à l'horizon. Sur le chemin du retour, alors que les ruines s'effacent, tu rencontres un pèlerin vêtu d'un manteau de cendres, au visage masqué de bois blanc. Il s'incline et te remet un parchemin scellé par une mèche de tes propres cheveux - que tu ne te souviens pas qu'on t'ait pris.",
        1,
        "Pèlerin du Vide - Manteau de cendres, masque de bois blanc. Il semble connaître ton destin mieux que toi.",
        "pelerin_parchemin.jpg",
      ],
      [
        12,
        "Tu marches seul vers la Couronne d'Épine à travers le Bois-Puits, un lieu où l'espace et la mémoire se plient aux volontés anciennes. Une silhouette familière approche - une femme dont tu ne vois pas le visage. Elle tient dans ses mains le paquet ensanglanté perdu durant ta fuite. Elle t'annonce froidement qu'il contenait ton vrai nom, désormais volé par un autre.",
        1,
        "Femme mystérieuse - Visage non visible, elle semble liée à ton passé oublié. Porteuse de mauvaises nouvelles.",
        "bois_puits_nom_vole.jpg",
      ],
      [
        13,
        "L'air devient lourd. Quelqu'un approche - quelqu'un qui te ressemble. Tu fais face à ton double, une version de toi plus jeune, plus pure, peut-être plus cruelle. Il se présente comme celui que tu aurais pu être, celui que tu as refusé de devenir, celui qui se souvient. Il te tend une lame noire sans reflet et t'explique qu'il ne peut y avoir qu'un seul porteur pour la Brèche.",
        1,
        "Ton double - Version alternative de toi-même, plus jeune et qui possède tes souvenirs perdus. Il tient une lame noire inquiétante.",
        "miroir_fendu_double.jpg",
      ],
      [
        14,
        "Le sommet est proche. Tu vois la Brèche suspendue dans le ciel, un gouffre qui transperce la réalité. La Couronne d'Épine flotte au-dessus du vide, ses pics tournoyants scintillant de souvenirs et de malheurs. Trois escaliers mènent à elle, mais un seul porteur peut franchir le seuil. C'est maintenant que tu dois choisir la fin de ton histoire et le prix que tu es prêt à payer.",
        1,
        "Ton double - Selon le choix précédent, il peut être ton allié, ton ennemi, ou une partie de toi-même à accepter.",
        "couronne_epine_choix_final.jpg",
      ],
    ];
    for (const etape of etapes) {
      await connection.execute(
        `INSERT INTO etape (id, texte, history_id, pnj, background) VALUES (?, ?, ?, ?, ?)`,
        etape
      );
    }

    const choices = [
      [
        1,
        "La Lame Noire, Tu ressens dans ton bras la mémoire d'un guerrier : vif, impitoyable, doué au combat rapproché.",
        1,
        12,
      ],
      [
        2,
        "L'Ombre Sifflante, Tu étais un rôdeur. Discret, rusé, maniant la dague et le mensonge comme des armes.",
        1,
        12,
      ],
      [
        3,
        "L'Appel du Sang, Tu sens couler en toi une magie ancienne, interdite. Tu étais sorcier… ou pire.",
        1,
        12,
      ],

      [4, "Accepter la dague cérémonielle de Morgha", 2, 1],
      [5, "Refuser la dague et chercher une autre arme", 2, 1],

      [6, "Prendre la pierre de veillée (ressusciter une fois)", 3, 2],
      [7, "Prendre l'anneau de murmures (entendre les secrets cachés)", 3, 3],
      [8, "Prendre la poche d'ombres (dissimulation)", 3, 4],

      [9, "Partir vers les Peste-Ruines d'Ashtorath à l'ouest", 4, 1],
      [10, "Se diriger vers la Forêt de Gräven au sud-est", 4, 1],
      [11, "Aller vers les Temples en ruine au nord-est", 4, 1],

      [12, "Prendre la fiole de mémoire (contenant un souvenir vivant)", 5, 5],
      [
        13,
        "Prendre la lame d'obsidienne (fragile mais tranche les esprits)",
        5,
        6,
      ],
      [14, "Prendre le crochet de Brèche (pulse au rythme de ton cœur)", 5, 7],
      [15, "Refuser les objets du marchand et partir", 5, 1],

      [16, "Entrer directement dans la tour", 6, 1],
      [17, "Observer la tour de loin avant d'approcher", 6, 1],
      [18, "Contourner la tour et continuer ton chemin", 6, 1],

      [
        19,
        "Choisir d'éveiller la Reine Écorchée dans les ruines d'Ashtorath",
        7,
        8,
      ],
      [20, "Choisir d'éveiller le Veilleur Aveugle sous les Temples", 7, 8],
      [21, "Choisir d'éveiller la Mère Cendre sous le Lac Noir", 7, 8],

      [22, "Protéger l'enfant avec un objet de défense", 8, 2],
      [23, "Fuir immédiatement avec un artefact de voyage", 8, 4],
      [24, "Appeler à l'aide avec un objet magique", 8, 3],
      [25, "Tenter de sauver le paquet ensanglanté", 8, 10],

      [26, "Montrer du respect à la Reine", 9, 1],
      [27, "Défier la Reine et ses ombres", 9, 1],
      [28, "Tenter de négocier avec elle", 9, 1],

      [29, "Offrir ton propre sang pour réveiller la porte", 10, 1],
      [30, "Demander à la Reine de donner son sang", 10, 1],
      [31, "Utiliser un artefact obtenu précédemment", 10, 5],

      [32, "Garder le parchemin scellé pour le bon moment", 11, 9],
      [33, "Ouvrir immédiatement le parchemin par curiosité", 11, 9],
      [34, "Refuser le parchemin du Pèlerin", 11, 1],

      [35, "Accepter la perte de ton nom avec résignation", 12, 10],
      [36, "Tenter de récupérer le paquet coûte que coûte", 12, 10],
      [37, "Fuir avant que l'autre version de toi n'arrive", 12, 10],
      [38, "Demander qui a volé ton nom", 12, 10],

      [39, "Accepter le combat contre ton double", 13, 11],
      [40, "Refuser la lame et chercher une réconciliation", 13, 11],
      [41, "Proposer de partager le fardeau ensemble", 13, 11],
      [42, "Tenter de fuir ce choix impossible", 13, 11],

      [
        43,
        "Te sacrifier - Laisser l'autre franchir la Brèche (Fin 1: Le Héros Oublié)",
        14,
        11,
      ],
      [
        44,
        "Combattre ton double pour prendre sa place (Fin 2: Le Brisé)",
        14,
        11,
      ],
      [
        45,
        "Fusionner avec lui pour devenir complet (Fin 3: Le Souverain Gris)",
        14,
        11,
      ],
    ];
    for (const choice of choices) {
      await connection.execute(
        `INSERT INTO choice (id, texte, etape_id, object_id) VALUES (?, ?, ?, ?)`,
        choice
      );
    }

    const users = [
      [1, "Porte-Marque", "avatar_portemarque.jpg", "portemarque@yrnwald.com"],
      [2, "Morgha", "avatar_morgha.jpg", "morgha@veilleurs.com"],
      [3, "Voyageur", "avatar_voyageur.jpg", "voyageur@cendres.com"],
      [4, "Reine-Écorchée", "avatar_reine.jpg", "reine@ashtorath.com"],
      [5, "Marchand-Masqué", "avatar_marchand.jpg", "marchand@graven.com"],
    ];
    for (const user of users) {
      await connection.execute(
        `INSERT INTO users (id, pseudo, avatar, email) VALUES (?, ?, ?, ?)`,
        user
      );
    }

    const etapeObjects = [
      [1, 12],
      [2, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [7, 8],
      [8, 10],
      [11, 9],
      [12, 10],
      [13, 11],
      [14, 11],
    ];
    for (const eo of etapeObjects) {
      await connection.execute(
        `INSERT INTO etape_object (etape_id, object_id) VALUES (?, ?)`,
        eo
      );
    }

    const inventories = [
      [false, 1, 1, 1],
      [false, 1, 2, 1],
      [false, 1, 12, 1],
      [true, 1, 3, 1],
      [false, 1, 4, 1],
    ];
    for (const inv of inventories) {
      await connection.execute(
        `INSERT INTO inventory (is_used, user_id, object_id, history_id) VALUES (?, ?, ?, ?)`,
        inv
      );
    }

    const progressions = [
      [1, 1, 12, 1],
      [1, 3, 2, 1],
      [1, 5, 5, 3],
      [1, 9, 1, 1],
    ];
    for (const prog of progressions) {
      await connection.execute(
        `INSERT INTO progress (history_id, etape_id, object_id, user_id) VALUES (?, ?, ?, ?)`,
        prog
      );
    }
    console.log("✅ Database schema created successfully");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
};

seed();
