import { ref } from 'vue';

export const ressourceGlobal = ref([
    { name: "Monnaie", img: "poverty", color: "#D33A42", currentLevel: 0 },
    { name: "Nourriture", img: "hunger", color: "#D5A950", currentLevel: 3 },
    { name: "Energie vitale", img: "health", color: "#629C47", currentLevel: 100 },
    { name: "Connaissance", img: "education", color: "#B52E34", currentLevel: 80 },
    { name: "Inclusivité", img: "genderEquality", color: "#DC5239", currentLevel: 71 },
    { name: "Eau", img: "water", color: "#5ABBDE", currentLevel: 65 },
    { name: "Puissance", img: "energy", color: "#F2B843", currentLevel: 65 },
    { name: "Croissance", img: "decentWork", color: "#822438", currentLevel: 15 },
    { name: "Innovation", img: "innovation", color: "#E27439", currentLevel: 50 },
    { name: "Egalité", img: "inequality", color: "#CB3267", currentLevel: 26 },
    { name: "Réseau", img: "communities", color: "#EB9F43", currentLevel: 43 },
    { name: "Sobriété", img: "consumption", color: "#B78C41", currentLevel: 70 },
    { name: "CO2", img: "climateActions", color: "#4F7C4A", currentLevel: 50 },
    { name: "Aquadiversité", img: "lifeAquatic", color: "#4296D3", currentLevel: 82 },
    { name: "Terradiversité", img: "lifeLand", color: "#73BD46", currentLevel: 35 },
    { name: "Justice", img: "peaceJustice", color: "#2A6799", currentLevel: 10 },
    { name: "Engagement", img: "partnership", color: "#254867", currentLevel: 27 },
    { name: "Temps", img: "time", color: "#BDBDBD", currentLevel: 100 },
    { name: "Aléatoire", img: "random", currentLevel: 0}
]);

export const transformers = ref([
    {
        name: "Tribunal",
        type: "Jeu de décision",
        description: "Prenez des décisions en balançant les cartes à gauche ou à droite. Ces décisions auront un petit ou un grand impact sur vos ressources. Vous aurez 5 choix à faire. Le 5ème choix affectera de manière plus conséquente vos ressources ou vos interactions sur la carte.",
        ressourceNecessaire: { name: "Temps" , img: "time", level: -30 },
        ressourceRecue: { name: "Justice" , img: "peaceJustice", level: 30 },
        consequence: { name: "Aléatoire" , img: "random", level: [-20, 30] }
    },
    {
        name: "Scierie",
        type: "Jeu de plateforme",
        description: "Atteignez la fin du niveau pour couper le courant de la scierie, tout en évitant les scies et les morceaux de bois qui tombent. ",
        ressourceNecessaire: { name: "Terradiversité" , img: "lifeLand", level: -15 },
        ressourceRecue: { name: "Croissance" , img: "decentWork", level: 10 },
        consequence: { name: "CO2" , img: "climateActions", level: [20] }
    },
    {
        name: "STEP",
        type: "Jeu de puzzle",
        description: "Faites pivotez et connectez les tuyaux dans le temps imparti, afin de guider les eaux usées à travers la station d'épuration. Mode de jeu : clicker les tuyaux pour les faire tourner",
        ressourceNecessaire: { name: "Eau" , img: "water", level: -10 },
        ressourceRecue: { name: "Monnaie" , img: "poverty", level: 15 },
        consequence: { name: "Engagement" , img: "partnership", level: [30] }
    }
])

export const menuOpened = ref(false);

