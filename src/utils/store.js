import { ref } from 'vue';

export const ressourceGlobal = ref([
    { name: "CO2", img: "climateActions", currentLevel: 50 },
    { name: "Réseau", img: "communities", currentLevel: 43 },
    { name: "Sobriété", img: "consumption", currentLevel: 70 },
    { name: "Croissance", img: "decentWork", currentLevel: 15 },
    { name: "Connaissance", img: "education", currentLevel: 80 },
    { name: "Puissance", img: "energy", currentLevel: 65 },
    { name: "Inclusivité", img: "genderEquality", currentLevel: 71 },
    { name: "Energie vitale", img: "health", currentLevel: 100 },
    { name: "Nourriture", img: "hunger", currentLevel: 3 },
    { name: "Egalité", img: "inequality", currentLevel: 26 },
    { name: "Innovation", img: "innovation", currentLevel: 50 },
    { name: "Aquadiversité", img: "lifeAquatic", currentLevel: 82 },
    { name: "Terradiversité", img: "lifeLand", currentLevel: 35 },
    { name: "Engagement", img: "partnership", currentLevel: 27 },
    { name: "Justice", img: "peaceJustice", currentLevel: 10 },
    { name: "Monnaie", img: "poverty", currentLevel: 0 },
    { name: "Temps", img: "time", currentLevel: 100 },
    { name: "Eau", img: "water", currentLevel: 65 }
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
        description: "Blablabla scierie",
        ressourceNecessaire: { name: "Eau" , img: "water", level: -10 },
        ressourceRecue: { name: "Monnaie" , img: "poverty", level: 15 },
        consequence: { name: "Engagement" , img: "partnership", level: [30] }
    }
])

