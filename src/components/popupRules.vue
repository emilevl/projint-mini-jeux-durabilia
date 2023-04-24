<script setup>
import { ref } from 'vue';
import { ressourceGlobal } from '../utils/store';


const props = defineProps({
    transformer: Object,
    gameLaunched: Boolean
})

const emit = defineEmits([
    'emitToggleRules',
    'emitPlay'
]);

/////////////////////////// Manage the level progression of the ressource bars (Désolé il y'a beaucoup de redondance je me suis beaucoup perdu en écrivant le code :/)
//Necessaire
const ressourceNecessaireLevel = ref("")
const ressourceNecessaireImpact = ref(`${Math.abs(props.transformer.ressourceNecessaire.level) / 100 * 200}px`)
const ressourceNecessaireColor = ref("green")
//Recue
const ressourceRecueLevel = ref("")
const ressourceRecueImpact = ref(`${Math.abs(props.transformer.ressourceRecue.level) / 100 * 200}px`)
const ressourceRecueColor = ref("green")
//Consequence Min
const ressourceConsequenceMinImpact = ref(`${Math.abs(props.transformer.consequence.level[0]) / 100 * 200}px`)
const ressourceConsequenceColor = ref("green")
const ressourceConsequenceLevel = ref("")
//Consequence Max
const ressourceConsequenceMaxImpact = ref(`${Math.abs(props.transformer.consequence.level[1]) / 100 * 200}px`)

let necessaireTemp = 0
let recueTemp = 0
let consequenceTemp = 0
function getLevelProgression() {
    ressourceGlobal.value.forEach(ressource => {
        if (ressource.name == props.transformer.ressourceNecessaire.name) necessaireTemp = ressource.currentLevel
        if (ressource.name == props.transformer.ressourceRecue.name) recueTemp = ressource.currentLevel
        if (ressource.name == props.transformer.consequence.name) consequenceTemp = ressource.currentLevel
    })
    // Diminuer la taille de la bar noir si le niveau d'impact est négatif
    if (props.transformer.ressourceNecessaire.level < 0) {
        necessaireTemp += props.transformer.ressourceNecessaire.level
        ressourceNecessaireColor.value = "red"
    }
    if (props.transformer.ressourceRecue.level < 0) {
        recueTemp += props.transformer.ressourceRecue.level
        ressourceRecueColor.value = "red"
    }
    if (props.transformer.consequence.level < 0) {
        consequenceTemp += props.transformer.consequence.level
        ressourceConsequenceColor.value = "red"
    } else if (props.transformer.name == "Tribunal") {
        consequenceTemp = 20
        ressourceConsequenceColor.value = "red"
    }
    ressourceNecessaireLevel.value = `${(necessaireTemp / 100) * 200}px`
    ressourceRecueLevel.value = `${(recueTemp / 100) * 200}px`
    ressourceConsequenceLevel.value = `${(consequenceTemp / 100) * 200}px`
}
getLevelProgression()

//MOBILE VERSION
//////////////////////////////// To detect if the user is on small screen of not (less than 800px)
const mobileInterface = ref(false)
if (window.innerWidth < 1050) {
    mobileInterface.value = true
} else {
    mobileInterface.value = false
}

//For mobile, know which section to show (rules or ressources)
const showFirstSection = ref(true)
function toggleSectionMobile() {
    showFirstSection.value = !showFirstSection.value
}

//Necessaire
const ressourceNecessaireLevel_MOBILE = ref("")
const ressourceNecessaireImpact_MOBILE = ref(`${Math.abs(props.transformer.ressourceNecessaire.level) / 100 * 100}px`)
//Recue
const ressourceRecueLevel_MOBILE = ref("")
const ressourceRecueImpact_MOBILE = ref(`${Math.abs(props.transformer.ressourceRecue.level) / 100 * 100}px`)
//Consequence Min
const ressourceConsequenceMinImpact_MOBILE = ref(`${Math.abs(props.transformer.consequence.level[0]) / 100 * 100}px`)
const ressourceConsequenceLevel_MOBILE = ref("")
//Consequence Max
const ressourceConsequenceMaxImpact_MOBILE = ref(`${Math.abs(props.transformer.consequence.level[1]) / 100 * 100}px`)

ressourceNecessaireLevel_MOBILE.value = `${(necessaireTemp / 100) * 100}px`
ressourceRecueLevel_MOBILE.value = `${(recueTemp / 100) * 100}px`
ressourceConsequenceLevel_MOBILE.value = `${(consequenceTemp / 100) * 100}px`

</script>

<template>
    <div class="background" @click="$emit('emitToggleRules')"></div>

    <!-- Desktop interface -->
    <div v-if="!mobileInterface" class="container">
        <h3 v-if="!props.gameLaunched" class="close-x" @click="$emit('emitToggleRules')">X</h3>
        <div class="rules-full-container">
            <h2 class="title">{{ props.transformer.name }}</h2>
            <p class="type-game">{{ props.transformer.type }}</p>
            <img class="pause-deco" src="/assets/icons/rules-deco.svg">
            <div class="rules-container">
                <h3 class="subtitle">Règles</h3>
                <p class="rules-p">{{ props.transformer.description }}</p>
                <div class="ressources-container">
                    <div class="ressources-details">
                        <p class="ressources-type">Ressources nécessaires</p>
                        <div class="ressources-progression">
                            <div class="ressources-info">
                                <img class="ressources-icon"
                                    :src="`/assets/icons/${props.transformer.ressourceNecessaire.img}.svg`">
                                <p class="ressources-name">{{ props.transformer.ressourceNecessaire.name }}</p>
                            </div>
                            <div class="progression-bar-container">
                                <div class="progression-bar-current" id="bar-necessaire-level"></div>
                                <div class="progression-bar-impact" id="bar-necessaire-impact"></div>
                            </div>
                            <p v-if="parseInt(props.transformer.ressourceNecessaire.level) < 0" class="ressources-impact">{{
                                props.transformer.ressourceNecessaire.level }}</p>
                            <p v-if="parseInt(props.transformer.ressourceNecessaire.level) > 0" class="ressources-impact">
                                +{{ props.transformer.ressourceNecessaire.level }}</p>
                        </div>
                    </div>
                    <div class="ressources-details">
                        <p class="ressources-type">Ressources reçues</p>
                        <div class="ressources-progression">
                            <div class="ressources-info">
                                <img class="ressources-icon"
                                    :src="`/assets/icons/${props.transformer.ressourceRecue.img}.svg`">
                                <p class="ressources-name">{{ props.transformer.ressourceRecue.name }}</p>
                            </div>
                            <div class="progression-bar-container">
                                <div class="progression-bar-current" id="bar-recue-level"></div>
                                <div class="progression-bar-impact" id="bar-recue-impact"></div>
                            </div>
                            <p v-if="parseInt(props.transformer.ressourceRecue.level) < 0" class="ressources-impact">{{
                                props.transformer.ressourceRecue.level }}</p>
                            <p v-if="parseInt(props.transformer.ressourceRecue.level) > 0" class="ressources-impact">+{{
                                props.transformer.ressourceRecue.level }}</p>
                        </div>
                    </div>
                    <div class="ressources-details">
                        <p class="ressources-type">Conséquences</p>
                        <div class="ressources-progression">
                            <div class="ressources-info">
                                <img class="ressources-icon"
                                    :src="`/assets/icons/${props.transformer.consequence.img}.svg`">
                                <p class="ressources-name">{{ props.transformer.consequence.name }}</p>
                            </div>
                            <div class="progression-bar-container">
                                <div class="progression-bar-current" id="bar-consequence-min-level"></div>
                                <div class="progression-bar-impact" id="bar-consequence-min-impact"></div>
                            </div>
                            <p v-if="parseInt(props.transformer.consequence.level[0]) < 0" class="ressources-impact">
                            <p v-if="props.transformer.name == 'Tribunal'" class="ressources-impact-special">de </p> {{
                                props.transformer.consequence.level[0] }}</p>
                            <p v-if="parseInt(props.transformer.consequence.level[0]) > 0" class="ressources-impact">
                            <p v-if="props.transformer.name == 'Tribunal'" class="ressources-impact-special">de </p> +{{
                                props.transformer.consequence.level[0] }}</p>
                        </div>
                        <div v-if="props.transformer.name == 'Tribunal'" class="ressources-progression">
                            <div class="progression-bar-container">
                                <div class="progression-bar-current" id="bar-consequence-max-level"></div>
                                <div class="progression-bar-impact" id="bar-consequence-max-impact"></div>
                            </div>
                            <p v-if="parseInt(props.transformer.consequence.level[1]) < 0" class="ressources-impact">à {{
                                props.transformer.consequence.level[1] }}</p>
                            <p v-if="parseInt(props.transformer.consequence.level[1]) > 0" class="ressources-impact">à +{{
                                props.transformer.consequence.level[1] }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button v-if="!props.gameLaunched" class="play-button" @click="$emit('emitPlay')">Jouer</button>
        </div>
    </div>

    <!-- Mobile interface -->
    <div v-if="mobileInterface" class="container">
        <h3 v-if="!props.gameLaunched" class="close-x" @click="$emit('emitToggleRules')">X</h3>
        <div class="rules-full-container">
            <h2 class="title">{{ props.transformer.name }}</h2>
            <p class="type-game">{{ props.transformer.type }}</p>
            <img class="pause-deco" src="/assets/icons/rules-deco.svg">
            <div v-if="showFirstSection" class="section-1">
                <div class="rules-container">
                    <div class="next-section-button" @click="toggleSectionMobile()">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <div class="previous-section-button disabled">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <h3 class="subtitle">Règles</h3>
                    <p class="rules-p">{{ props.transformer.description }}</p>
                </div>
                <button v-if="!props.gameLaunched" class="play-button" @click="toggleSectionMobile()">Suivant</button>
            </div>
            <div v-if="!showFirstSection" class="section-2">
                <div class="rules-container">
                    <div class="next-section-button disabled">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <div class="previous-section-button" @click="toggleSectionMobile()">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <div class="ressources-container">
                        <div class="ressources-details">
                            <p class="ressources-type">Ressources nécessaires</p>
                            <div class="ressources-progression">
                                <div class="ressources-info">
                                    <img class="ressources-icon"
                                        :src="`/assets/icons/${props.transformer.ressourceNecessaire.img}.svg`">
                                    <p class="ressources-name">{{ props.transformer.ressourceNecessaire.name }}</p>
                                </div>
                                <div class="progression-bar-container">
                                    <div class="progression-bar-current" id="bar-necessaire-level"></div>
                                    <div class="progression-bar-impact" id="bar-necessaire-impact"></div>
                                </div>
                                <p v-if="parseInt(props.transformer.ressourceNecessaire.level) < 0"
                                    class="ressources-impact">{{
                                        props.transformer.ressourceNecessaire.level }}</p>
                                <p v-if="parseInt(props.transformer.ressourceNecessaire.level) > 0"
                                    class="ressources-impact">
                                    +{{ props.transformer.ressourceNecessaire.level }}</p>
                            </div>
                        </div>
                        <div class="ressources-details">
                            <p class="ressources-type">Ressources reçues</p>
                            <div class="ressources-progression">
                                <div class="ressources-info">
                                    <img class="ressources-icon"
                                        :src="`/assets/icons/${props.transformer.ressourceRecue.img}.svg`">
                                    <p class="ressources-name">{{ props.transformer.ressourceRecue.name }}</p>
                                </div>
                                <div class="progression-bar-container">
                                    <div class="progression-bar-current" id="bar-recue-level"></div>
                                    <div class="progression-bar-impact" id="bar-recue-impact"></div>
                                </div>
                                <p v-if="parseInt(props.transformer.ressourceRecue.level) < 0" class="ressources-impact">{{
                                    props.transformer.ressourceRecue.level }}</p>
                                <p v-if="parseInt(props.transformer.ressourceRecue.level) > 0" class="ressources-impact">+{{
                                    props.transformer.ressourceRecue.level }}</p>
                            </div>
                        </div>
                        <div class="ressources-details">
                            <p class="ressources-type">Conséquences</p>
                            <div class="ressources-progression">
                                <div class="ressources-info">
                                    <img class="ressources-icon"
                                        :src="`/assets/icons/${props.transformer.consequence.img}.svg`">
                                    <p class="ressources-name">{{ props.transformer.consequence.name }}</p>
                                </div>
                                <div class="progression-bar-container">
                                    <div class="progression-bar-current" id="bar-consequence-min-level"></div>
                                    <div class="progression-bar-impact" id="bar-consequence-min-impact"></div>
                                </div>
                                <p v-if="parseInt(props.transformer.consequence.level[0]) < 0" class="ressources-impact">
                                <p v-if="props.transformer.name == 'Tribunal'" class="ressources-impact-special">de </p> {{
                                    props.transformer.consequence.level[0] }}</p>
                                <p v-if="parseInt(props.transformer.consequence.level[0]) > 0" class="ressources-impact">
                                <p v-if="props.transformer.name == 'Tribunal'" class="ressources-impact-special">de </p> +{{
                                    props.transformer.consequence.level[0] }}</p>
                            </div>
                            <div v-if="props.transformer.name == 'Tribunal'" class="ressources-progression">
                                <div class="progression-bar-container">
                                    <div class="progression-bar-current" id="bar-consequence-max-level"></div>
                                    <div class="progression-bar-impact" id="bar-consequence-max-impact"></div>
                                </div>
                                <p v-if="parseInt(props.transformer.consequence.level[1]) < 0" class="ressources-impact">à
                                    {{
                                        props.transformer.consequence.level[1] }}</p>
                                <p v-if="parseInt(props.transformer.consequence.level[1]) > 0" class="ressources-impact">à
                                    +{{
                                        props.transformer.consequence.level[1] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button v-if="!props.gameLaunched" class="play-button" @click="$emit('emitPlay')">Jouer</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* /////////////////////////////////////////////////////// DESKTOP */
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

.close-x {
    cursor: pointer;
    position: absolute;
    left: 100%;
    transform: translate(-100%, 0);
    line-height: 1;
    padding: 30px;
}

.container {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 600px;
    background-color: #FBF8F1;
    text-align: center;
}

.rules-full-container {
    padding: 50px;
    height: 500px;
}

.rules-container {
    text-align: left;
    padding-left: 50px;
    padding-right: 50px;
}

.pause-deco {
    width: 100%;
}

.ressources-container {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}

.rules-p,
.type-game,
.ressources-name,
.ressources-impact,
.ressources-impact-special {
    font-size: 1em;
}

.ressources-details {
    display: flex;
    flex-direction: column;
}

.play-button {
    all: unset;
    font-size: 1.2rem;
    width: 100px;
    height: 50px;
    font-family: 'Urbanist', 'Inter', sans-serif;
    cursor: pointer;
    transition: 0.3s;
}

.play-button:hover {
    background-color: black;
    color: #FBF8F1;
    border-radius: 20px 0px;
    transition: 0.3s;
}

/* --------------------------------- Ressources Progression ------------------------------------------------ */
.ressources-type {
    font-size: 1.3em;
    font-weight: bold;
}

.ressources-progression {
    display: flex;
    flex-direction: column;
    width: 200px;
}

.ressources-info {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    margin-top: 10px;
}

.ressources-icon {
    height: 24px;
}

.ressources-impact {
    margin: 0;
    display: inline-block;
    align-self: flex-end;
}

.ressources-impact-special {
    margin: 0;
    display: inline-block;
}

/* ----------- BAR PROGRESSION --------------- */
.progression-bar-container {
    margin-top: 10px;
    width: 200px;
    height: 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: start;
}

.progression-bar-current {
    background-color: black;
}

#bar-necessaire-level {
    width: v-bind(ressourceNecessaireLevel);
}

#bar-necessaire-impact {
    width: v-bind(ressourceNecessaireImpact);
    background-color: v-bind(ressourceNecessaireColor);
}

#bar-recue-level {
    width: v-bind(ressourceRecueLevel);
}

#bar-recue-impact {
    width: v-bind(ressourceRecueImpact);
    background-color: v-bind(ressourceRecueColor);
}

#bar-consequence-min-level {
    width: v-bind(ressourceConsequenceLevel);
}

#bar-consequence-min-impact {
    width: v-bind(ressourceConsequenceMinImpact);
    background-color: v-bind(ressourceConsequenceColor);
    opacity: 0.5;
}

#bar-consequence-max-level {
    width: 80px;
}

#bar-consequence-max-impact {
    width: v-bind(ressourceConsequenceMaxImpact);
    background-color: green;
    opacity: 0.5;
}

/* /////////////////////////////////////////////////////// MOBILE */

.bar-1,
.bar-2 {
    background-color: black;
    height: 3px;
    width: 15px;
}

.bar-1 {
    transform: rotate(45deg) translate(0px, -4px);
}

.bar-2 {
    transform: rotate(-45deg) translate(0px, 4px);
}

.next-section-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-25px, 0);
}

.previous-section-button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(25px, 0) rotateY(180deg);
}

.disabled {
    opacity: 20%;
}

@media screen and (max-width: 1050px) {
    .close-x {
        padding: 25px;
        font-size: 1.5em;
    }

    .container {
        width: 600px;
        height: 350px;
    }

    .rules-full-container {
        padding: 25px;
        height: 300px;
    }

    .rules-container {
        height: 180px;
    }

    .title {
        font-size: 1.5em;
    }

    .subtitle {
        font-size: 1.2em;
        padding-top: 10px;
    }

    .rules-p,
    .type-game {
        font-size: 0.8em;
    }

    .play-button {
        font-size: 0.8em;
        background-color: black;
        color: #FBF8F1;
        border-radius: 10px 0px;
        width: 70px;
        height: 30px;
        margin: 0;
    }

    /* ----------------------------------- Bar Progression --------------------------------- */
    .ressources-container {
        margin-top: 0px;
    }

    .ressources-name,
    .ressources-impact,
    .ressources-impact-special {
        font-size: 0.8em;
    }

    .ressources-type {
        font-size: 0.8em;
        padding-top: 10px;
    }

    .ressources-icon {
        height: 16px;
    }

    .ressources-info {
        gap: 10px;
    }

    .ressources-progression {
        width: 100px;
    }

    .progression-bar-container {
        width: 100px;
        height: 10px;
    }

    /* -------------- calculation of the width of the progression bars ----------------------- */
    #bar-necessaire-level {
        width: v-bind(ressourceNecessaireLevel_MOBILE);
    }

    #bar-necessaire-impact {
        width: v-bind(ressourceNecessaireImpact_MOBILE);
    }

    #bar-recue-level {
        width: v-bind(ressourceRecueLevel_MOBILE);
    }

    #bar-recue-impact {
        width: v-bind(ressourceRecueImpact_MOBILE);
    }

    #bar-consequence-min-level {
        width: v-bind(ressourceConsequenceLevel_MOBILE);
    }

    #bar-consequence-min-impact {
        width: v-bind(ressourceConsequenceMinImpact_MOBILE);
    }

    #bar-consequence-max-level {
        width: 40px;
    }

    #bar-consequence-max-impact {
        width: v-bind(ressourceConsequenceMaxImpact_MOBILE);
    }
}
</style>