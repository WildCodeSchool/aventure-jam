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
      TRUNCATE TABLE choice;
      TRUNCATE TABLE steps;
      TRUNCATE TABLE history;
      TRUNCATE TABLE object;
      TRUNCATE TABLE users;
      SET FOREIGN_KEY_CHECKS = 1;
    `);

    await connection.execute(
      `INSERT INTO history (id, title, description) VALUES (?, ?, ?)`,
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
        `<p>Tu ouvres les yeux, étendu sur un sol froid et dur.<br />
        Autour de toi, des ruines noyées dans une brume cramoisie. L’air sent la chair calcinée et la cendre mouillée.<br />
        Le ciel est figé, crevé d’un œil rouge qui ne cligne jamais. <br />
        Tu n’as ni souvenir, ni nom. Juste la sensation aiguë que tu n’es pas censé être là… pas en vie.</p>
        <br />
        <p>Tu te redresses lentement. Tes membres sont engourdis, ta gorge sèche comme si tu avais crié des siècles dans le vide.</p>
        <br />
        <p>Tu baisses les yeux sur ta main droite : une marque noire, brûlée dans ta chair. Un œil fermé, entouré de crocs.<br />
        Tu n’en connais pas le sens, mais il pulse, chaud, comme un cœur battant.</p>
        <br />
        <p>Quelque chose en toi sait : cette marque est une clef. Ou une malédiction.</p>
        <br />
        <p>Derrière toi, un craquement.</p>
        <br />
        <p>Tu te retournes d’instinct. Une silhouette approche entre les pierres effondrées : une vieille femme drapée d’un manteau de suie. Son visage est masqué par un bandeau de cuir clouté.<br />
        « Tu n’as pas de nom… » dit-elle d’une voix rauque. « Alors tu peux en forger un. Mais la Marque… elle, t’a choisi. »</p>
        <br />
        <p>Elle tend la main. Tu hésites… puis la prends.<br />
        <p>« Suis-moi, Porte-Marque. Il te reste peu de temps avant que le Néant ne te réclame de nouveau. »</p>`,
        1,
        "Morgha la Céciteuse.",
        "/background/imageRuineBrumeCramoisie.png",
      ],
      [
        2,
        `<p>Elle te conduit dans les profondeurs d’un sanctuaire à moitié effondré, un ancien Temple des Veilleurs.<br />
        Là, dans l’obscurité fumeuse, brûle un feu noir, silencieux.</p> 
        <br />
        <p>La femme – elle se nomme Morgha la Céciteuse, elle te donne de quoi boire.<br />
        L’eau est cendreuse, mais elle te rend un peu de vigueur.<br />
        « Le monde s’éteint. Les Brèches, ouvertes par la Couronne d’Épine, laissent entrer la Peste Rouge et ses Enfants. »<br />
        « Toi, tu viens d’un monde d’avant. Ou peut-être d’un futur qui n’existe plus. Qu’importe. Tu portes la Marque. Tu peux refermer la Brèche originelle. »</p>
        <br />
        <p>Elle tend une dague cérémonielle. L’acier est sombre, strié de runes éteintes.<br />
        « Mais tu n’as pas d’arme… ni de souvenir. Commence par choisir ce que tu es. Ce que tu veux devenir. »</p>`,
        1,
        "Morgha la Céciteuse.",
        "/background/feuNoirTemple.png",
      ],
      [
        3,
        `<p>Tu sers la dague contre ta paume. Son contact est froid, presque douloureux. Mais dans ton esprit, un écho s’éveille.<br /> 
        Des souvenirs… ou des fragments de ce que tu pourrais être.</p>
        <br />
        <p>Tu ne les comprends pas tous. Tu ne sais pas encore ce que tu étais. Mais quelque chose, là-dessous, se tend vers la surface.</p>
        <br />
        <p>Morgha te regarde longuement.<br />
        « Il est encore temps.<br />
        Certains fils du destin sont brisés, d’autres simplement noués. Ta marque n’est pas qu’un fardeau, Porte-Marque. Elle est aussi une clef. »</p>
        <br />
        <p>Elle glisse quelque chose dans ta main libre. Un petit objet, que tu glisses sans réfléchir à ta ceinture, autour de ton cou ou à ton doigt.<br />
        Tu ne sais pas encore ce qu’il est, ni à quoi il servira, mais il pulse doucement contre toi. Un talisman, peut-être… ou un dernier mensonge.<br />
        « Yrnwald ne peut plus être sauvé, mais ce qui se trouve au nord… la Brèche originelle, elle, peut être scellée.</p> 
        <br />
        <p>Tu ne survivras pas si tu t’y rends aujourd’hui. Il te faudra des réponses. De la puissance. Des choix. »</p>`,
        1,
        "Morgha la Céciteuse.",
        "/background/feuNoirTemple.png",
      ],
      [
        4,
        `<p>Dehors, le vent a tourné.<br />
        L’aube ne vient pas.<br />
        Yrnwald a oublié la lumière du jour, depuis longtemps.<br />
        Dans l’air, une odeur de fer et de cendre. Des bourrasques froides transportent des cendres rouges, tourbillonnant comme des lucioles mourantes.</p>
        <br />
        <p>La lumière, ici, ne provient plus du ciel, mais des Brèches — ces plaies ouvertes dans le tissu du monde.<br />
        Elles pulsent, chaque battement arrachant un peu plus de réalité à ce qui reste du royaume.<br />
        Et ceux qui s’en approchent trop deviennent… autre chose.</p>
        <br />
        <p>Tu ressens soudain un tiraillement dans ta main marquée.<br />
        Une vision surgit dans ton esprit — ou peut-être une réminiscence imposée par la Marque.</p>
        <br />
        <p>Dans ton esprit, une carte se déploie, brûlée dans ta mémoire.<br />
        Trois routes apparaissent, claires et nettes, comme si tu avais toujours su qu’elles existaient.<br />
        Chacune irradie une énergie différente, attirante et mortelle à la fois.</p>
        <br />
        <p>- À l’ouest, les Peste-Ruines d’Ashtorath : un champ de bataille figé dans le temps, hanté par les échos d’une guerre oubliée.<br /> 
        On raconte qu’une reine déchue y veille encore, prisonnière de ses propres malédictions.</p>
        <br />
        <p>- Au sud-est, la Forêt de Gräven : un bois tortueux où même les arbres semblent doués de conscience.<br /> 
        Des murmures y flottent en permanence, certains offrant du savoir… d’autres un piège certain.</p>
        <br />
        <p>- Au nord-est, les Temples en ruine, vestiges d’une foi dévorée par la folie. Des Veilleurs fanatiques y rôdent encore,<br /> 
        plus dangereux que les bêtes, prêts à défendre ce qu’ils appellent « la pureté du Néant ».</p>
        <br />
        <p>Tu sais que tu devras en choisir une.<br />
        Aucune de ces routes n’est sûre.<br />
        Mais toutes mènent à un fragment de la vérité… et peut-être à un bout de toi-même que tu as perdu.</p>
        <br />
         <p>La Marque palpite, impatiente.<br />
        Le destin t’attend.</p>`,
        1,
        null,
        "/background/troisRoutes.png",
      ],
      [
        5,
        `<p>Les arbres de Gräven se referment sur toi comme des os longs et tordus. Le silence y est pesant, troublé seulement par les chuchotements des feuilles mortes.<br /> 
        Elles ne tombent jamais. Elles t’observent.</p>
        <br />
        <p>Tu progresses à pas lents. Tu sens parfois ton reflet marcher à contre-courant sur l’écorce.<br />
        Puis, une lumière rougeâtre perce le brouillard. Un feu. Un campement. Un petit autel fait de crânes et de branches. Et une silhouette accroupie.<br />
        « Porte-Marque, hm ? Tu sens encore le sang frais. C’est rare. La plupart de ceux que je vois ici… sont creux. »</p>
        <br />
        <p>Un marchand masqué, vêtu de bandes de cuir et de morceaux d’ossements polis, s’adresse à toi sans lever les yeux. Son visage est caché par un masque rituel. Il ne semble pas hostile.<br />
        « Je vends souvenirs, malédictions, promesses… et parfois, des choses utiles. Tout dépend de ce que tu cherches. Et de ce que tu es prêt à perdre. »</p>
        <br />
        <p>Il étale devant toi plusieurs objets :</p>
        <br />
        <p>- Une fiole de mémoire, contenant un souvenir vivant.</p>
        <br />
        <p>- Une lame d'obsidienne, fragile mais capable de trancher les esprits.</p>
        <br />
        <p>- Un crochet de Brèche, qui pulse au rythme de ton propre cœur.</p>
        <br />
        <p>Tu ressens une familiarité étrange avec un des objets.<br />
        Ton instinct te guide, ou peut-être est-ce la Marque. Le marchand, en te regardant, modifie discrètement l’ordre des objets. Il sait quelque chose, ou croit savoir.<br />
        « Tu peux en prendre un. Mais je prendrai quelque chose aussi. Pas maintenant. Plus tard. Quand tu auras oublié que tu m'es redevable. »</p>
        <br />
        <p>Il rit. Puis s'efface dans les bois, comme s'il n'avait jamais été là.</p>
        <br />
        <p>Tu repars. L’objet que tu as choisi ou celui que tu n’as pas refusé.<br />
        Tu ne sais pas encore quand il te servira.<br /> 
        Tu ne sais pas encore ce qu’il t’a coûté.</p>`,
        1,
        "Marchand masqué.",
        "/background/troisRoutes.png",
      ],
      [
        6,
        `<p>Tu quittes Gräven par l’ancien sentier de pierre, là où la mousse mange les symboles oubliés. Dans ton dos, les arbres se referment lentement.<br /> 
        Ils n’aiment pas laisser partir ce qu’ils ont vu.<br />
        La brume devient cendre.<br />
        Le vent porte des éclats de voix. Ce ne sont pas des mots — juste la sensation d’être appelé.</p>
        <br />
        <p>Tu marches.<br />
        Au loin, une tour solitaire perce la plaine déserte.<br />
        La Tour du Voile.</p>
        <br />
        <p>Autrefois, c’était un phare pour les sentinelles du nord.<br />
        Aujourd’hui, elle penche sous son propre poids, éventrée à mi-hauteur, mais toujours dressée comme un doigt contre le ciel gris.</p>
        <br />
        <p>Tu l’atteins au crépuscule (même si, ici, le crépuscule ne finit jamais).<br />
        Le seuil est ouvert.</p> 
        <br />
        <p>Tu entres.</p>`,
        1,
        null,
        "/background/pillierNoir.png",
      ],
      [
        7,
        `<p>À l’intérieur, la lumière s’éteint d’elle-même. Les murs sont couverts de runes effacées, que tu ne peux lire  ou que tu refuses de comprendre.<br />
        Dans le silence, un grincement. Quelqu’un vit encore ici. Et il t’attendait.</p>
        <br />
        <p>Un vieillard, vêtu de peaux rapiécées, un bandeau couvrant ses yeux. Il tend vers toi une main décharnée.<br />
        « Porte-Marque. Tu es… tôt. Trop tôt. Ou bien trop tard. »</p>
        <br />
        <p>Il n’a pas de nom. Il ne parle que par symboles. Des fragments. Mais tu comprends une chose :<br />
        « Si tu veux atteindre la Brèche, tu devras éveiller l’un des Trois Dormeurs. »</p>
        <br />
        <p>Trois piliers scellés par le sang ancien, gardiens des portes de la Couronne d’Épine. Trois entités liées à ton propre passé. Ou futur.<br />
        Il pointe vers les cartes à moitié brûlées clouées au mur :<br />
        La Reine Écorchée, dans les ruines d’Ashtorath.</p>
        <br />
        <p>- Le Veilleur Aveugle, sous les Temples.</p>
        <br />
        <p>- La Mère Cendre, endormie sous le Lac Noir.</p>
        <br />
        <p>- Tu devras en réveiller au moins un. Mais aucun réveil ne sera sans prix.</p>
        <br />
        <p>À partir de maintenant, le choix que tu as fait plus tôt commence à modifier subtilement ton lien avec ces entités.<br />
        L’un d’eux te répondra plus aisément.<br />
        Un autre pourrait te reconnaître.<br />
        Un troisième pourrait te haïr.<br />
        Mais tu ignores encore lequel.</p>
        <br />
        <p>Avant de partir, le vieil homme te remet un fragment d’os poli. Une clef.<br />
        Pas pour une porte, mais pour un souvenir.<br />
        « Quand la douleur viendra, serre-la fort. Et regarde bien ce que tu oubliais. »</p>
        <br />
        <p>Tu repars.</p>`,
        1,
        "Vieillard aveugle.",
        "/background/vieillardAveugle.png",
      ],
      [
        8,
        `<p>Fuyant la Brèche vivante, tu ouvres une voie vers un territoire inconnu.<br /> 
        Les vents cendrés mordent ta peau tandis que tu franchis un ancien pont de pierre, effondré par endroits, suspendu au-dessus d’un gouffre sans fond.</p>
        <br />
        <p>Derrière toi, la Brèche hurle, une gueule béante et palpitante, crachant des filaments d’ombre qui rampent sur les murs et les colonnes brisées,<br />
        traquant ta chaleur, ton souffle, ton existence même.</p>
        <br />
        <p>Tu cours, chaque pas résonne comme un tambour funeste sur les dalles fissurées. La Brèche n’oublie jamais ce qui lui échappe.<br />
        Tu n’es plus qu’un fugitif, poursuivi par un abîme qui te connaît déjà mieux que toi-même.<br />
        Pourtant, quelque part au-delà de ce pont, un territoire inconnu t’appelle, porteur d’espoir ou de damnation.</p>
        <br />
        <p>Derrière toi, la Brèche te traque encore.</p>`,
        1,
        null,
        "/background/brecheFuite.png",
      ],
      [
        9,
        `<p>Tu franchis les arches brisées et les avenues mortes d’Ashtorath, la cité déchue. Sous tes pas, le sol craque :<br /> 
        ce ne sont pas des pierres, mais des ossements blanchis, mêlés à la cendre.</p>
        <br />
        <p>Le vent y charrie une odeur de fer et de cendre froide. La lumière rouge des Brèches coule le long des murs éboulés, projetant des ombres immenses et déformées.</p>
        <br />
        <p>Au centre de la place principale, un trône de fer fondu se dresse encore, forgé dans les restes de l’ancien pouvoir.<br />
        Dessus repose la Reine Écorchée, sa chair est à nu, nouée de chaînes d’argent et de tissus ensanglantés, mais elle siège avec une grâce morbide.<br /> 
        Ses yeux, deux abysses sans fond, te fixent avec une faim ancienne.<br />
        « Un Porte-Marque… Enfin. » murmure-t-elle, sa voix aussi douce que le poison.</p>
        <br />
        <p>Elle tend sa main décharnée, dévoilant une lame noire, faite du même fer que son trône.<br />
        « Le chemin vers la Brèche demande du sang, Porte-Marque. Le mien… ou le tien. »</p>
        <br />
        <p>Son regard te transperce, comme si elle sondait les fragments de ton âme.<br />
        Tu sais que ce choix ne sera pas sans conséquence. Qu’importera ton offrande, la Reine ne sortira pas indemne de cet échange.<br />
        L’air devient plus lourd. Le silence s’étend, suspendu, attendant ta décision.</p>
        <br />
        <p>Le Pacte de Sang d’Ashtorath te guette.</p>`,
        1,
        "La Reine Écorchée",
        "/background/avenueMorte.png",
      ],
      [
        10,
        `<p>Le sol se met à trembler sous tes pieds, d’abord faiblement, puis avec la violence d’un cœur ancien qui se réveille.</p>
        <br />
        <p>Dans les profondeurs d’Ashtorath, des chaînes invisibles se rompent une à une, leurs échos résonnant comme des cloches funèbres dans toute la cité dévastée.</p>
        <br />
        <p>Un pilier noir, suintant d’une lumière blafarde, surgit des entrailles du sol, tordant la réalité autour de lui.<br /> 
        Il pulse au rythme de la Marque que tu portes, comme si une partie de toi répondait à son appel.<br />
        Autour, l’air devient lourd, saturé d’une odeur de cendre brûlante et de métal ancien.</p>
        <br />
        <p>Puis vient le cri.</p>
        <br />
       <p>Un hurlement lointain, venu d’un autre temps, un cri d’agonie et de renaissance, qui transperce les brumes d’Yrnwald.<br />
        Tu comprends, sans qu’on te l’explique : le premier Dormeur est éveillé.<br />
        Un rayon d’énergie écarlate s’élève vers les cieux morts, traçant un sillon visible depuis chaque recoin du monde.</p>
        <br />
        <p>Désormais, plus rien ne sera jamais comme avant.</p>`,
        1,
        null,
        "/background/cheminTour.png",
      ],
      [
        11,
        `<p>Sur le chemin du retour, alors que les ruines d’Ashtorath disparaissent lentement derrière toi, noyées dans la brume rougeâtre,<br /> 
        une silhouette se dessine au milieu du sentier effacé.</p>
        <br />
        <p>Un pèlerin. Son visage est caché sous un masque de bois blanc, sans expression, et son manteau semble fait de cendres et de linceuls rapiécés.</p>
        <br />
        <p>Sans dire un mot, il incline la tête et s’approche.</p>
        <br />
        <p>Il tend un parchemin ancien, scellé d’une mèche de cheveux… tes propres cheveux. Tu ne te souviens pas qu’on ait pu te les prendre,<br /> 
        mais tu reconnais la teinte, la texture, et un frisson te parcourt.<br />
        Sa voix, faible comme un souffle entre les mondes, brise enfin le silence :<br />
        « Ouvre-le seulement lorsque tu n’auras plus d’autre choix. »</p>
        <br />
        <p>Il te fixe longuement, et tu devines, derrière le masque, un regard qui sait trop de choses.</p>
        <br />
        <p>« Souviens-toi… Ce que tu crois avoir perdu peut encore être sauvé. »</p>
        <br />
        <p>Avant que tu ne puisses poser la moindre question, il disparaît dans la brume, comme effacé de la réalité.<br />
        Seul reste ce poids dans ta main : le parchemin scellé, brûlant d’un secret que tu redoutes de connaître.</p> `,
        1,
        "Pèlerin du Vide",
        "/background/pelerinMasqué.png",
      ],
      [
        12,
        `<p>Dans les profondeurs du Bois-Puits, là où la brume se mêle aux ombres tordues des arbres morts, le chemin se dérobe sous tes pas.<br />
        L’air devient plus lourd, saturé d’une étrange nostalgie. Chaque pas semble t’enfoncer davantage dans un passé que tu n’as jamais demandé à retrouver.</p>
        <br />
        <p>Une silhouette apparaît, surgissant lentement d’un voile de brume mouvante.<br />
        Une femme, drapée d’un long manteau sombre. Son visage reste masqué par un voile d’argent, et sa voix résonne dans ta tête avant même qu’elle ne parle.</p>
        <br />
        <p>Dans ses mains pâles, elle tient un objet que tu reconnais aussitôt : le paquet ensanglanté que tu avais perdu lors de ta fuite.<br />
        Elle s’arrête à quelques pas de toi et tend l’objet sans un mot. Puis, d’une voix glaciale, elle murmure :<br />
        « Tu l’as abandonné. »</p>
        <br />
        <p>Son ton n’est ni accusateur, ni compatissant. Elle énonce un fait. Un constat.<br />
        « Ce paquet contenait ton vrai nom. Celui que tu as volontairement oublié pour survivre jusqu’ici. »</p>
        <br />
        <p>La brume autour de toi s’épaissit. L’atmosphère devient suffocante, et une silhouette s’avance derrière elle, encore dissimulée dans les ombres mouvantes.<br />
        La femme recule alors, disparaissant sans laisser de trace, comme si elle n’avait jamais existé.<br />
        Il ne reste que toi, ton fardeau retrouvé… et ce qui s’approche lentement, prêt à te confronter.</p> `,
        1,
        "Femme mystérieuse.",
        "/background/profondeureBoisPuit.png",
      ],
      [
        13,
        `<p>La forêt s'efface derrière toi, avalée par la brume.<br />
        Tu marches dans un espace où les frontières s’effondrent, là où le sol et le ciel se confondent, et où la mémoire se replie sur elle-même.</p>
        <br />
        <p>Devant toi, une silhouette t’attend.<br />
        Tu la reconnais avant même de discerner ses traits.</p>
        <br />
        <p>C'est toi. Une version de toi-même, plus jeune, plus claire… ou peut-être simplement plus vraie.<br />
        Il porte les marques de ton passé, celles que tu as refusé de voir. Son regard te transperce, froid et sans jugement.<br />
        Dans ses mains, une lame noire, sans reflet, comme un abîme qui absorbe la lumière.</p>
        <br />
        <p>Il te tend l’arme. Sa voix est douce, presque triste :<br />
        « Il ne peut y avoir qu’un seul Porte-Marque. La Brèche exige un porteur. Un seul. »<br />
        Puis il ajoute, sans détour :</p>
        <br />
        <p>- « Tu peux fuir.</p> 
        <br />
        <p>- Tu peux me combattre.</p> 
        <br />
        <p> -Ou bien… tu peux m’accepter. »</p>
        <br />
        <p>Les mots résonnent comme une sentence.<br />
        Ce choix, tu l’as peut-être déjà fait ailleurs, dans un souvenir oublié ou dans un futur effacé.<br />
        Mais ici, face à toi-même, il ne peut plus être repoussé.<br />
        C’est le dernier carrefour, celui qui décide non seulement de ta survie…<br />
        mais aussi de ce que deviendra le monde.</p>`,
        1,
        "Ton double.",
        "/background/boisPuitsVide.png",
      ],
      [
        14,
        `<p>Le ciel se déchire au-dessus de toi, dévoilant la Couronne d’Épine, suspendue au-dessus du gouffre béant qu’est la Brèche.<br />
        Elle tourne lentement, immense et silencieuse, tissée d’épines noires et de fragments de souvenirs déchirés. Chaque pointe scintille de lumière rouge, comme des étoiles mourantes.</p>
        <br />
        <p>Trois escaliers de pierre s'élèvent vers elle, chacun portant les marques des choix que tu as faits jusque-là.<br />
        Aucun ne semble plus sûr qu’un autre.</p>
        <br />
        <p>Tu ressens la Brèche t’appeler, affamée, impatiente. C’est ici que ton voyage prend fin. Ici que tu dois faire le dernier choix.</p>
        <br />
        <p>Le vent hurle autour de toi, portant les échos de tous ceux qui t’ont précédé… et échoué.</p>
        <br />
        <p>Un seul Porte-Marque peut franchir le seuil.<br />
        Ce que tu abandonneras ici ne pourra jamais être repris.</p>`,
        1,
        null,
        "/background/finalPicture.png",
      ],
      [
        15,
        `<p>Les ruines d’Ashtorath se dressent devant toi, noyées sous une brume écarlate qui glisse entre les colonnes brisées comme une marée vivante.<br />
        Chaque pas réveille une poussière noire, lourde comme du plomb. Le vent lui-même semble fuir ce lieu.</p>
        <br />
        <p>Autour de toi, des ombres rampent, silencieuses, traînant derrière elles des traînées de cendres incandescentes.<br />
        Au centre de ce charnier oublié, une silhouette t’attend, drapée dans des lambeaux d’étoffe et de fumée.</p>
        <br />
        <p>Un Spectre.<br />
        Son visage est masqué par une couronne fendue, et sa voix n’est qu’un souffle glacé, sifflant entre les pierres :<br />
        « Porte-Marque… Reviens d’où tu viens. Ou abandonne ce que tu crois être tien. »</p>
        <br />
        <p>Il tend une main décharnée vers toi, paume ouverte, attendant que tu fasses ton choix.<br />
        Dans son regard, il n’y a ni haine, ni compassion. Seulement la faim d’un pacte ancien.</p>
        <br />
        <p>Un frisson parcourt ton dos. Ici, il te faudra sacrifier quelque chose : ta mémoire… ou ta chair.</p>`,
        1,
        "Spectres des ruines",
        "/background/ruineSpectre.png",
      ],
      [
        16,
        `<p>Tu descends dans les entrailles des ruines d’Ashtorath.<br />
        Les escaliers de pierre s’effritent sous tes pas, chaque marche recouverte de suie, de cendres et d’ossements noircis par le feu ancien.<br />
        Les murs transpirent, suintant une humidité chaude mêlée à la cendre, comme si la cité elle-même pleurait ses morts.</p>
        <br />
        <p>Au loin, une faible lueur vacille dans l’obscurité étouffante.<br />
        Une flamme pâle, oscillant sans source apparente, t’invite à continuer, mais plus tu avances, plus la Marque sur ta main brûle.</p>
        <br />
        <p>Tu ressens une présence…<br />
        Quelque chose d’ancien, tapi dans l’ombre, qui attend que tu franchisses un seuil invisible.<br />
        Pourtant, tes jambes avancent, guidées par cette lumière qui semble t’appeler par ton propre sang.</p>`,
        1,
        null,
        "/background/ruineSpectre.png",
      ],
      [
        17,
        `<p>Les Temples en ruine s’élèvent autour de toi, leurs colonnes effondrées marquant les vestiges d’un culte oublié.</p>
        <br />
        <p>L’air est saturé d’une odeur âcre, un mélange de fer, de cendres et d’encens brûlé jusqu’à la pierre.</p>
        <br />
        <p>Dans l’ombre des arches brisées, des silhouettes encapuchonnées prient en silence.<br />
        Leurs voix sont absentes, mais leurs lèvres remuent dans une ferveur glaciale, comme si elles récitaient un serment ancien que seul l’écho des murs peut entendre.</p>
        <br />
        <p>Leurs robes sont lourdes, couvertes de symboles tracés avec du sang séché et de la cendre.<br />
        À chaque pas que tu fais, leurs têtes se tournent lentement vers toi, dévoilant des visages masqués, où l’on devine des regards vides, consumés par la dévotion.</p>
        <br />
        <p>Leurs gestes sont lents, presque mécaniques, comme s’ils suivaient une volonté qui n’est plus la leur.<br />
        Tu ressens que ce lieu est sacré… ou maudit.</p>
        <br />
        <p>Quelque chose t’attend ici.<br />
        Une opportunité… ou un piège.</p>`,
        1,
        "Fanatique",
        "/background/autelMassif.png",
      ],
      [
        18,
        `<p>Sous les fondations fragiles des Temples en ruine, tu découvres une crypte oubliée.<br />
        L’air y est plus lourd, chargé d’une énergie ancienne, presque palpable.<br />
        Au centre, un autel massif, gravé de symboles étranges et de runes effacées, s’élève dans l’obscurité.<br />
        La lumière de ta Marque pulse doucement, résonnant avec les gravures.</p>
        <br />
        <p>Devant toi, un choix crucial :</p>
        <br />
        <p>Purifier la Marque — offrir une part de ton essence pour la purifier, effaçant ses ténèbres, au risque de t’affaiblir temporairement.</p>
        <br />
        <p>Ou corrompre davantage la Marque — embrasser pleinement son pouvoir obscur, au prix de t’enfoncer plus profondément dans la cendre et le néant.</p>
        <br />
        <p>Le poids de ta décision pèse lourd dans la nuit silencieuse.<br />
        Chaque option façonnera ta destinée.</p> `,
        1,
        null,
        "/background/autelMassif.png",
      ],
      [
        19,
        `<p>Sous la surface du Lac Noir, tout s’alourdit. L’eau, épaisse et sombre comme du verre liquide, freine chacun de tes mouvements.<br /> 
        Chaque pas s’enfonce dans un lit de cendres détrempées, réveillant des volutes noires qui s’élèvent comme des spectres endormis.</p>
        <br />
        <p>Le silence est absolu, brisé seulement par ta propre respiration, étouffée et lointaine, comme si tu étais déjà mort.<br />
        Au cœur du sanctuaire englouti, tu la vois.</p>
        <br />
        <p>La Mère Cendre.</p>
        <br />
        <p>Une silhouette gigantesque, pétrifiée dans un sommeil sans âge. Son corps, formé de pierre et de racines cendrées, repose sur un trône d’ossements noués.<br />
        Des veines d’obsidienne serpentent sa peau minérale, pulsant au rythme d’une lueur rougeoyante, comme un cœur encore vivant.</p>
        <br />
        <p>À mesure que tu t’approches, l’eau elle-même frémit sous son souffle. Chaque battement de sa respiration fait vibrer l’air et l’eau,<br /> 
        distordant la lumière autour d’elle.
        Des souvenirs diffus surgissent dans ton esprit. Des murmures d’un pacte ancien. Une soif insatiable, un pouvoir interdit.</p>
        <br />
        <p>Tu comprends que son rêve n’est pas seulement un songe : c’est une corruption qui s’étend lentement, menaçant d’engloutir tout ce qui approche.<br /> 
        Pourtant, quelque chose en toi s’y rattache, une marque oubliée, un lien profond…<br />
        comme si tu avais jadis bu à sa source, ou porté son héritage.</p>`,
        1,
        null,
        "/background/mereCendre.png",
      ],
      [
        20,
        `<p>Tu fermes les yeux un instant. Le vent tourbillonne autour de la Couronne d’Épine, emportant les cendres et les fragments de mémoire arrachés au monde.<br />
          Face à toi, ton double te fixe. Il ne dit rien. Il sait ce que tu t’apprêtes à faire.</p>
        <br />
          <p>Sans un mot, tu t’écartes.</p>
        <br />
        <p>Tu le laisses franchir la Brèche à ta place.Il s’avance, lentement, absorbé par la lumière écarlate. Chaque pas résonne comme un glas.<br /> 
        La Marque sur ta main s’efface, consumée par un feu froid. Ton souffle devient brume.Lorsque ton double atteint le seuil, un éclat traverse le ciel.<br /> 
        La Brèche se referme dans un hurlement muet. Les chaînes de la Couronne d’Épine se brisent, et le monde entier semble retenir son souffle.</p>
        <br />
        <p>Tu sens ton propre être se déliter.Ton nom… ton vrai nom… s’efface, comme s’il n’avait jamais existé.<br /> 
        Les souvenirs te glissent entre les doigts. Même ton visage devient flou dans ton esprit. Mais une chose demeure claire :</p>
        <br />
        <p>Le monde est sauvé.</p>
        <br />
        <p>Yrnwald renaîtra, libéré de la Peste Rouge et des Brèches.<br />
        Les flammes noires s’éteignent une à une.<br />
        La lumière, nouvelle et douce, caresse l’horizon.<br />
        Les habitants des terres oubliées réapprennent à respirer, à vivre, à espérer.<br />
        Et pourtant…</p>
        <br />
        <p>Personne ne se souviendra jamais de toi.<br />
        Ni de ton sacrifice, ni de ta lutte, ni de ton existence.</p>
        <br />
        <p>Tu deviens un souffle dans la brise, une ombre dans les contes qui ne seront jamais contés.</p>
        <br />
        <p>Mais quelque part, dans le silence du monde réparé, une rumeur persiste :<br />
        "Quand le néant menacera à nouveau, un Porte-Marque sans nom reviendra…"</p>
        <br />
        <p>Puis tout s’efface.</p>`,
        1,
        null,
        "/background/finalPicture.png",
      ],
      [
        21,
        `<p>La Couronne d’Épine scintille, suspendue au-dessus de la Brèche béante. Autour de toi, le monde entier retient son souffle.</p>
        <br />
        <p>Face à toi, ton double t'observe.<br /> 
        Il est calme, sûr de lui. Un sourire froid sur les lèvres, il lève son arme, celle que tu reconnais comme une extension de toi-même.</p>
        <br />
        <p>Le choix t’est retiré, il faut combattre.<br />
        La lutte est brutale, sans répit, sans pitié. Vos coups résonnent comme des tonnerres. L’acier contre l’acier, la chair contre la chair.<br />
        Chaque impact déchire un peu plus le tissu du monde, et la Brèche rugit, avide de dévorer l’un de vous.</p>
        <br />
        <p>Tu sens ta Marque brûler, s'embraser comme jamais auparavant. Elle alimente ta force, t’offrant la rage d'un désespoir ancien.<br />
        Ton double lutte avec la même fureur, car vous êtes faits du même sang, du même oubli.<br />
        Mais au terme d’un affrontement déchirant, c’est toi qui l’emportes.</p>
        <br />
        <p>Dans un dernier éclat de lumière noire, ton double s’effondre. Il te sourit, même en disparaissant.<br />
        Il savait que ce combat ne pouvait avoir de vainqueur. Le silence retombe.</p>
        <br />
        <p>La Brèche se referme sous ta main, obéissant à ta volonté brisée. La Couronne d’Épine s'efface, consumée dans le néant.</p>
        <br />
        <p>Yrnwald est sauvé. Le monde, lentement, reprend son souffle, mais toi…</p>
        <br />
        <p>Toi, tu sais que quelque chose s’est logé dans ton cœur. Un fragment de ton double, un éclat de noirceur, caché, tapi, affamé.<br />
        Tu es devenu le Héros que le monde attendait, mais au fond de toi, un murmure résonne encore.<br />
        Un poison lent. Une ombre qui grandira. Le monde ne le saura jamais. Mais toi.....</p>
        <br />
        <p>Tu ne l’oublieras pas.</p>`,
        1,
        null,
        "/background/finalPicture.png",
      ],
      [
        22,
        `<p>Le vent tourbillonne autour de la Couronne d’Épine, faisant danser les cendres dans l’air figé.<br />
        Devant toi, ton double t’attend, immobile, la lame baissée, son regard empreint d’une étrange compassion.<br />
        Mais cette fois, il n’y aura ni fuite, ni combat.</p>
        <br />
        <p>Tu tends la main vers lui. Sans un mot, il accepte. Vos doigts se rejoignent, et aussitôt, la Marque s’illumine, brûlante, dévorante.<br />
        Tout vacille. Tes souvenirs affluent, les tiens, mais aussi les siens. Des visions d’une vie que tu n’as jamais vécue. Des douleurs que tu n’as jamais ressenties.<br /> 
        Des pouvoirs que tu n’avais pas encore osé effleurer. Les limites entre vous s’effacent.</p>
        <br />
        <p>Tu ne sais plus où il finit et où tu commences. Vous n’êtes plus deux. Vous êtes un.<br />
        Une seule conscience, plus vaste, plus ancienne. Un souffle traverse le monde.</p>
        <br />
        <p>La Brèche, face à toi, se referme lentement, comme soumise à ta volonté nouvelle. La Couronne d’Épine s'incline devant ta puissance.<br /> 
        Le ciel se recoud, et Yrnwald renaît sous une lueur étrange. Mais rien ne sera jamais comme avant</p>.
        <br />
        <p>Car toi, désormais, tu portes tout : les souvenirs, la douleur, la Marque, le pouvoir… et le poids du monde.<br />
        Tu es devenu le Souverain Gris. Gardien d’un monde sauvé, mais transformé à jamais.</p>
        <br />
        <p>Roi d’un royaume où plus personne ne peut dire si la lumière triomphe encore de l’ombre.</p>`,
        1,
        null,
        "/background/finalPicture.png",
      ],
      [
        23,
        `<p>L’histoire touche à sa fin… mais toutes les réponses n’ont peut-être pas encore été trouvées.<br /> 
        Dans les Brumes d’Yrnwald, les souvenirs perdus attendent toujours les voyageurs assez fous pour les rechercher.</p>`,
        1,
        null,
        "/background/voieFinal.png",
      ],
    ];
    for (const etape of etapes) {
      await connection.execute(
        `INSERT INTO steps (id, text, history_id, pnj, background) VALUES (?, ?, ?, ?, ?)`,
        etape
      );
    }

    const choices = [
      [1, "Suivre la vieille femme à travers les ruines", 1, null, 2],

      [2, "Choisir La Lame Noire (guerrier)", 2, 1, 3],
      [3, "Choisir L’Ombre Sifflante (rôdeur)", 2, 1, 3],
      [4, "Choisir L’Appel du Sang (sorcier)", 2, 1, 3],

      [5, "Prendre la Pierre de veillée", 3, 2, 4],
      [6, "Prendre l’Anneau de murmures", 3, 3, 4],
      [7, "Prendre la Poche d’ombres", 3, 4, 4],

      [8, "Prendre la route vers les Peste-Ruines d’Ashtorath", 4, null, 15],
      [9, "Prendre la route vers la Forêt de Gräven", 4, null, 5],
      [10, "Prendre la route vers les Temples en ruine", 4, null, 17],

      [11, "Acheter la Fiole de mémoire", 5, 5, 6],
      [12, "Acheter la Lame d’obsidienne", 5, 6, 6],
      [13, "Acheter le Crochet de Brèche", 5, 7, 6],

      [14, "Suivre la route vers la Tour du Voile", 6, null, 7],

      [15, "Utiliser un objet défensif pour bloquer l’ombre", 8, null, 9],
      [
        16,
        "Utiliser un artefact de voyage pour fuir instantanément",
        8,
        null,
        9,
      ],

      [17, "Invoquer une aide temporaire", 8, null, 9],

      [18, "Offrir ton sang à la Reine Écorchée", 9, null, 10],
      [19, "Offrir le sien", 9, null, 10],

      [20, "Accepter le fragment d’os et continuer vers la suite", 10, 8, 11],

      [21, "Poursuivre vers la Couronne d’Épine", 11, 9, 12],

      [22, "Suivre la femme pour récupérer le paquet", 12, 10, 13],
      [23, "Refuser et continuer seul", 12, null, 13],

      [24, "Fuir et laisser ton autre franchir la Brèche", 13, null, 20],
      [25, "Combattre son double et prendre sa place", 13, 11, 21],
      [26, "Fusionner avec son double", 13, null, 22],

      [27, "Accepter de donner ta mémoire au Spectre", 15, null, 16],
      [28, "Refuser et affronter les ombres", 15, null, 16],

      [29, "Suivre la lumière dans les souterrains", 16, null, 8],
      [30, "Rebrousser chemin", 16, null, 8],

      [31, "Prier auprès des fanatiques", 17, null, 18],
      [32, "Tenter de dérober un artefact", 17, null, 18],

      [33, "Purifier ta Marque à l’autel", 18, null, 8],
      [34, "Corrompre davantage ta Marque à l’autel", 18, null, 8],
      [35, "Reprendre la route vers la Tour du Voile", 16, null, 7],
      [36, "Quitter les Temples et rejoindre la Tour du Voile", 18, null, 7],
      [
        37,
        "Se rendre aux Ruines d’Ashtorath pour réveiller la Reine Écorchée",
        7,
        null,
        15,
      ],
      [
        38,
        "Se rendre aux Temples pour éveiller le Veilleur Aveugle",
        7,
        null,
        17,
      ],
      [
        39,
        "Se rendre sous le Lac Noir pour éveiller la Mère Cendre",
        7,
        null,
        19,
      ],
      [
        40,
        "Éveiller la Mère Cendre en offrant un fragment de toi-même",
        19,
        null,
        8,
      ],
      [41, "Refuser de troubler son sommeil et fuir discrètement", 19, null, 8],
      [42, "Fin : Le Héros Oublié", 20, null, 23],
      [43, "Fin : Le Brisé", 21, null, 23],
      [44, "Fin : Le Souverain Gris", 22, null, 23],
      [45, "revenir à l'accueil.", 23, null, 0],
    ];
    for (const choice of choices) {
      await connection.execute(
        `INSERT INTO choice (id, text, step_id, object_id, link_to_step_id) VALUES (?, ?, ?, ?, ?)`,
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
        `INSERT INTO progress (history_id, step_id, object_id, user_id) VALUES (?, ?, ?, ?)`,
        prog
      );
    }
    console.log("✅ Database schema created successfully");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
};

seed();
