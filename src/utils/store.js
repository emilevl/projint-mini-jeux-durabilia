import { ref } from 'vue';

export const ressourceGlobal = ref([
    { name: "climateActions", currentLevel: 50 },
    { name: "communities", currentLevel: 43 },
    { name: "consumption", currentLevel: 70 },
    { name: "decentWork", currentLevel: 15 },
    { name: "education", currentLevel: 80 },
    { name: "energy", currentLevel: 65 },
    { name: "genderEquality", currentLevel: 71 },
    { name: "health", currentLevel: 100 },
    { name: "hunger", currentLevel: 3 },
    { name: "inequality", currentLevel: 26 },
    { name: "innovation", currentLevel: 50 },
    { name: "lifeAquatic", currentLevel: 82 },
    { name: "lifeLand", currentLevel: 35 },
    { name: "partnership", currentLevel: 27 },
    { name: "peaceJustice", currentLevel: 10 },
    { name: "poverty", currentLevel: 0 },
    { name: "time", currentLevel: 100 },
    { name: "water", currentLevel: 65 }
]);

export const transformers = ref([
    {
        name: "Tribunal",
        description: "Prenez des décisions en balançant les cartes à gauche ou à droite. Ces décisions auront un petit ou un grand impact sur vos ressources. Vous aurez 5 choix à faire. Le 5ème choix affectera de manière plus conséquente vos ressources ou vos interactions sur la carte.",
        ressourceNecessaire: { name: "time", level: -30 },
        ressourceRecue: { name: "inequality", level: 30 },
        consequence: { name: "random", level: { min: -20, max: 50 } }
    }
])