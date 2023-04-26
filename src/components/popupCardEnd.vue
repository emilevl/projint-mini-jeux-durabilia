<script setup>
import { onMounted, ref } from 'vue';
import { ressourceGlobal, transformers } from '../utils/store';
import ButtonComponent from './ButtonComponent.vue';
import CardBack from './card-back.vue';
import RessourceComponent from './RessourceComponent.vue';

const props = defineProps({
    cardSelection: Array
})

//Get current transformer
const CURRENT_TRANSFORMER = transformers.value.find(
    (transformer) => transformer.name == "Tribunal"
);

//Set size of ressource
const RESSOURCE_SIZE = ref(100)
if (window.innerWidth < 1050) {
    RESSOURCE_SIZE.value = 60
}

//Store the impact of the cards from the choices of the player
let playerChoices = ref([[], [], [], [], []])

//Get the total impact of the player choices
let totalImpact = ref([
    { name: "Monnaie", ressource: "poverty", color: "#D33A42", currentLevel: 0, impact: 0 },
    { name: "Nourriture", ressource: "hunger", color: "#D5A950", currentLevel: 3, impact: 0 },
    { name: "Energie vitale", ressource: "health", color: "#629C47", currentLevel: 100, impact: 0 },
    { name: "Connaissance", ressource: "education", color: "#B52E34", currentLevel: 80, impact: 0 },
    { name: "Inclusivité", ressource: "genderEquality", color: "#DC5239", currentLevel: 71, impact: 0 },
    { name: "Eau", ressource: "water", color: "#5ABBDE", currentLevel: 65, impact: 0 },
    { name: "Puissance", ressource: "energy", color: "#F2B843", currentLevel: 65, impact: 0 },
    { name: "Croissance", ressource: "decentWork", color: "#822438", currentLevel: 15, impact: 0 },
    { name: "Innovation", ressource: "innovation", color: "#E27439", currentLevel: 50, impact: 0 },
    { name: "Egalité", ressource: "inequality", color: "#CB3267", currentLevel: 26, impact: 0 },
    { name: "Réseau", ressource: "communities", color: "#EB9F43", currentLevel: 43, impact: 0 },
    { name: "Sobriété", ressource: "consumption", color: "#B78C41", currentLevel: 70, impact: 0 },
    { name: "CO2", ressource: "climateActions", color: "#4F7C4A", currentLevel: 50, impact: 0 },
    { name: "Aquadiversité", ressource: "lifeAquatic", color: "#4296D3", currentLevel: 82, impact: 0 },
    { name: "Terradiversité", ressource: "lifeLand", color: "#73BD46", currentLevel: 35, impact: 0 },
    { name: "Justice", ressource: "peaceJustice", color: "#2A6799", currentLevel: 10, impact: 0 },
    { name: "Engagement", ressource: "partnership", color: "#254867", currentLevel: 27, impact: 0 },
    { name: "Temps", ressource: "time", color: "#BDBDBD", currentLevel: 100, impact: 0 }
])

//Store the impacts of the player choices
function getPlayerChoices() {
    for (let [index, card] of props.cardSelection.entries()) {
        for (let impact of card.responses[card.decision].impact) {
            playerChoices.value[index].push(impact)
        }
    }
}
//Calculate all the impacts of the cards chosen
function updateImpactData() {
    for (let dataEntry of totalImpact.value) {
        //Get ressources level
        for (let ressource of ressourceGlobal.value) {
            if (dataEntry.ressource == ressource.img) {
                dataEntry.currentLevel = ressource.currentLevel
            }
        }
        //Get choices player
        for (let choice of playerChoices.value) {
            for (let impact of choice) {
                if (impact.ressource == dataEntry.ressource) {
                    dataEntry.impact += impact.level
                }
            }
        }
        //Get necesserry impact and received impact
        if (dataEntry.ressource == CURRENT_TRANSFORMER.ressourceNecessaire.img) dataEntry.impact += CURRENT_TRANSFORMER.ressourceNecessaire.level
        if (dataEntry.ressource == CURRENT_TRANSFORMER.ressourceRecue.img) dataEntry.impact += CURRENT_TRANSFORMER.ressourceRecue.level
    }
}

onMounted(() => {
    setTimeout(() => getPlayerChoices(), 10)
    setTimeout(() => updateImpactData(), 10)
})

//Manage the nav between the choices
let activeSection = ref("Résumé")
function changeSection(id) {
    if (activeSection.value != id) {
        activeSection.value = id
        setTimeout(() => toggleRessourceReset(), 10)
        setTimeout(() => toggleRessourceReset(), 10)
    }
}

function endGame() {
    totalImpact.value.forEach(ressource => {
        ressourceGlobal.value.forEach(glob => {
            if (glob.img == ressource.ressource) {
                //glob.currentLevel += ressource.impact
                //Ici, il faut modifier le niveau des ressources liées au joueur
            }
        })
    });
    window.location.hash = ""
}

//Manage the dropdown menu
const showDropDown = ref(false)
function toggleDropDown() {
    showDropDown.value = !showDropDown.value
}

const ressourceReset = ref(false)
function toggleRessourceReset() {
    ressourceReset.value = !ressourceReset.value
}
</script>

<template>
    <div class="background"></div>
    <div class="recap-container">
        <h2 class="title">Ressources impactées</h2>
        <img class="pause-deco" src="/assets/icons/rules-deco.svg">

        <div class="content">
            <div class="navbar">
                <div class="drop-down-options">
                    <div class="drop-down-placeholder-container" @click="toggleDropDown()">
                        <p class="drop-down-placeholder-text">{{ activeSection }}</p>
                        <img class="drop-down-symbol" src="/assets/icons/down-arrow.svg"
                            :class="{ placeholderActive: showDropDown }">
                    </div>
                    <p v-show="showDropDown" class="navbar-option button" id="Résumé"
                        :class="{ active: activeSection == 'Résumé' }"
                        @click="changeSection($event.target.id), toggleDropDown()">Résumé</p>
                    <p v-show="showDropDown" class="navbar-option button" v-for="n in 5" :id="`Carte ${n}`"
                        :class="{ active: activeSection == `Carte ${n}` }"
                        @click="changeSection($event.target.id), toggleDropDown()">Carte {{
                            n
                        }}</p>
                </div>
            </div>

            <section class="detail-section" id="Résumé-section" v-show="activeSection == 'Résumé'">
                <RessourceComponent v-for="impact of totalImpact" :img="impact.ressource" :impactLevel="impact.impact"
                    :ressourceSize="RESSOURCE_SIZE" :ressourceReset="ressourceReset"></RessourceComponent>
            </section>
            <section v-for="n in 5" class="detail-section choice-section" :id="`choix-${n}-section`"
                v-show="activeSection == `Carte ${n}`">
                <!-- CARDS -->
                <div class="card-container">
                    <CardBack class="card-details" :title="props.cardSelection[n - 1].title"
                        :question="props.cardSelection[n - 1].question"
                        :response="props.cardSelection[n - 1].responses[props.cardSelection[n - 1].decision].name">
                    </CardBack>
                </div>

                <div class="bar-container">
                    <RessourceComponent v-for="impact of playerChoices[n - 1]" :img="impact.ressource"
                        :impactLevel="impact.level" :ressourceSize="RESSOURCE_SIZE" :ressourceReset="ressourceReset">
                    </RessourceComponent>
                </div>
            </section>
        </div>

        <ButtonComponent class="back-to-map" @click="endGame()">Retour à la carte
        </ButtonComponent>
    </div>
</template>

<style scoped>
.background {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 50%;
}

.recap-container {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 600px;
    background-color: #FBF8F1;
    text-align: center;
    padding: 50px;
}

.pause-deco {
    width: 100%;
}

.content {
    width: 100%;
    height: 450px;
}

.navbar {
    cursor: pointer;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-content: space-evenly;
    z-index: 5;
    background-color: #FBF8F1;
    border-radius: 20px 0px;
    padding: 10px;
    margin-left: 50px;
    text-align: left;
    top: 130px;
}

.navbar p {
    font-size: 1em;
}

.navbar-option {
    padding-top: 5px;
    border-radius: 20px 0px;
}

.drop-down-placeholder-container {
    display: flex;
    justify-content: space-between;
    width: 90px;
}

.drop-down-symbol {
    transition: 0.4s;
}

.placeholderActive {
    transform: rotate(180deg);
}

.drop-down-options {
    display: flex;
    flex-direction: column;
}

.active {
    display: none;
}

.detail-section {
    height: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 30px;
}

.card-container,
.bar-container {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.bar-container {
    gap: 25px;
}

.card-container {
    align-items: center;
}

.choice-section {
    display: flex;
    height: 400px;
}

.back-to-map {
    position: absolute;
    bottom: 0;
    margin-bottom: 50px;
    transform: translate(-50%, 0);
    background-color: black;
    color: #FBF8F1;
    border-radius: 20px 0px;
}
.back-to-map:hover {
    opacity: 0.5;
}

/* --------------------------- CARDS --------------------------------------- */
.card-details {
    transform: unset;
    width: 250px;
    height: 350px;
}

.card-details:deep(.card-title) {
    font-size: 1.2em;
    padding: 15px 15px 0 15px;
}

.card-details:deep(.card-question) {
    font-size: 0.8em;
    padding: 0px 15px;
}

.card-details:deep(.flip-card-response) {
    font-size: 0.8em;
}

.card-details:deep(.flip-card-band) {
    height: 17%;
}

/* ------------------------------- MOBILE ----------------------------------- */

@media screen and (max-width: 1050px) {
    .recap-container {
        width: 600px;
        height: 320px;
        padding: 0px;
    }

    .button {
        font-size: 0.8em;
        color: black;
        background-color: #FBF8F1;
    }

    .navbar {
        top: 45px;
        margin-left: 20px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .navbar p {
        font-size: 0.8em;
    }

    .title {
        font-size: 1.2em;
    }

    .content {
        width: 100%;
        height: 300px;
    }

    .detail-section {
        height: 200px;
        padding-left: 15px;
        padding-right: 15px;
        margin-top: 15px;
    }

    .back-to-map {
        margin-bottom: 15px;
        font-size: 0.8em;
        border-radius: 10px 0px;
    }

    /* Cards */
    .card-details {
        transform: unset;
        width: 150px;
        height: 200px;
    }

    .card-details:deep(.card-title) {
        font-size: 0.8em;
        padding: 5px 5px 0 5px;
    }

    .card-details:deep(.card-question) {
        font-size: 0.5em;
        padding: 0px 15px;
    }

    .card-details:deep(.flip-card-response) {
        font-size: 0.5em;
    }

    .card-details:deep(.flip-card-band) {
        height: 17%;
    }

    .card-container,
    .bar-container {
        width: 40%;
    }

    .choice-section {
        gap: 20px;
    }
}</style>