<script setup>
import { onMounted, ref } from 'vue';
import { ressourceGlobal } from '../utils/store';

const props = defineProps({
    cardSelection: Array
})

const emit = defineEmits([
    'closeRecap',
]);

//Store the impact of the cards from the choices of the player
let playerChoices = ref([[], [], [], [], []])

//Get the total impact of the player choices
let totalImpact = ref([
    { ressource: "climateActions", impact: 0, currentLevel: 0 },
    { ressource: "communities", impact: 0, currentLevel: 0 },
    { ressource: "consumption", impact: 0, currentLevel: 0 },
    { ressource: "decentWork", impact: 0, currentLevel: 0 },
    { ressource: "education", impact: 0, currentLevel: 0 },
    { ressource: "energy", impact: 0, currentLevel: 0 },
    { ressource: "genderEquality", impact: 0, currentLevel: 0 },
    { ressource: "health", impact: 0, currentLevel: 0 },
    { ressource: "hunger", impact: 0, currentLevel: 0 },
    { ressource: "inequality", impact: 0, currentLevel: 0 },
    { ressource: "innovation", impact: 0, currentLevel: 0 },
    { ressource: "lifeAquatic", impact: 0, currentLevel: 0 },
    { ressource: "lifeLand", impact: 0, currentLevel: 0 },
    { ressource: "partnership", impact: 0, currentLevel: 0 },
    { ressource: "peaceJustice", impact: 0, currentLevel: 0 },
    { ressource: "poverty", impact: 0, currentLevel: 0 },
    { ressource: "water", impact: 0, currentLevel: 0 },
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
            if (dataEntry.ressource == ressource.name) {
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
    }
}

onMounted(() => {
    setTimeout(() => getPlayerChoices(), 10)
    setTimeout(() => updateImpactData(), 10)
    setTimeout(() => showBars(), 10)
    setTimeout(() => showChange(), 300)
})

//Sets the bar of the current level of ressources (black bars)
function showBars() {
    for (let impact of totalImpact.value) {
        const barPrincipal = document.querySelector(`#barGlob-${impact.ressource}`)
        for (let ressource of ressourceGlobal.value) {
            if (ressource.name == impact.ressource) barPrincipal.style.height = `${(Math.abs(ressource.currentLevel) / 100) * 200}px`
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let impact of playerChoices.value[i]) {
            const barPrincipal = document.querySelector(`#barGlob-choice${i + 1}-${impact.ressource}`)
            for (let ressource of ressourceGlobal.value) {
                if (ressource.name == impact.ressource) barPrincipal.style.height = `${(Math.abs(ressource.currentLevel) / 100) * 200}px`
            }
        }
    }
}

//Set changes for the full recap of total impacts
function showChange() {
    //For totalImpacts (full recap)
    for (let impact of totalImpact.value) {
        const bar = document.querySelector(`#${impact.ressource}`)
        const barPrincipal = document.querySelector(`#barGlob-${impact.ressource}`)

        //Manage the case where we pass the bar limit (0 -> 100)
        if (impact.impact + parseInt(barPrincipal.style.height) / 2 >= 100) {
            impact.impact = 100 - parseInt(barPrincipal.style.height) / 2
        } else if (impact.impact + parseInt(barPrincipal.style.height) / 2 <= 0) {
            impact.impact = - parseInt(barPrincipal.style.height) / 2
        }

        bar.style.height = `${(Math.abs(impact.impact) / 100) * 200}px` //Sets the height for the change bar
        if (impact.impact < 0) {
            bar.style.backgroundColor = "red"
            barPrincipal.style.transition = "all 1s ease 0s" //For animation transition
            barPrincipal.style.height = `${parseInt(barPrincipal.style.height) - ((Math.abs(impact.impact) / 100) * 200)}px` //Diminish the black bar to let the red bar go over it
        }
        if (impact.impact > 0) bar.style.backgroundColor = "green"
    }

    //For the choices
    for (let i = 0; i < 5; i++) {
        for (let impact of playerChoices.value[i]) {
            const bar = document.querySelector(`#choice${i + 1}-${impact.ressource}`)
            const barPrincipal = document.querySelector(`#barGlob-choice${i + 1}-${impact.ressource}`)

            //Manage the case where we pass the bar limit (0 -> 100)
            if (impact.level + parseInt(barPrincipal.style.height) / 2 >= 100) {
                impact.level = 100 - parseInt(barPrincipal.style.height) / 2
            } else if (impact.level + parseInt(barPrincipal.style.height) / 2 <= 0) {
                impact.level = - parseInt(barPrincipal.style.height) / 2
            }

            bar.style.height = `${(Math.abs(impact.level) / 100) * 200}px`
            if (impact.level < 0) {
                bar.style.backgroundColor = "red"
                barPrincipal.style.transition = "all 1s ease 0s" //For animation transition
                barPrincipal.style.height = `${parseInt(barPrincipal.style.height) - ((Math.abs(impact.level) / 100) * 200)}px` //Diminish the black bar to let the red bar go over it
            }
            if (impact.level > 0) bar.style.backgroundColor = "green"
        }
    }
}

//Manage the nav between the choices
let activeSection = ref("recap")
function changeSection(id) {
    if (activeSection.value != id) {
        activeSection.value = id
        for (let impact of totalImpact.value) {
            const bar = document.querySelector(`#${impact.ressource}`)
            const barPrincipal = document.querySelector(`#barGlob-${impact.ressource}`)
            bar.style.height = `0px`
            bar.style.transform = `translate(0,0)`
            barPrincipal.style.transition = "all 0s ease 0s"
        }
        for (let i = 0; i < 5; i++) {
            for (let impact of playerChoices.value[i]) {
                const bar = document.querySelector(`#choice${i + 1}-${impact.ressource}`)
                bar.style.height = `0px`
                bar.style.transform = `translate(0,0)`
            }
        }
        showBars()
        setTimeout(() => showChange(), 300)
    }
}

function setNewRessources() {
    totalImpact.value.forEach(ressource => {
        ressourceGlobal.value.forEach(glob => {
            if(glob.name == ressource.ressource){
              //glob.currentLevel += ressource.impact
            }
        })
    });
}
</script>

<template>
    <div class="background"></div>
    <div class="recap-container">
        <h2 class="title">Modification des ressources</h2>

        <div class="content">
            <div class="navbar">
                <div class="navbar-option" id="recap" :class="{ active: activeSection == 'recap' }"
                    @click="changeSection($event.target.id)">Recap</div>
                <div class="navbar-option" v-for="n in 5" :id="`choix-${n}`"
                    :class="{ active: activeSection == `choix-${n}` }" @click="changeSection($event.target.id)"> Choix {{ n
                    }}</div>
            </div>

            <section class="detail-section" id="recap-section" v-show="activeSection == 'recap'">
                <div class="detail-progression" v-for="impact of totalImpact">
                    <img class="icon" :src="`src/assets/icons/${impact.ressource}.svg`">
                    <div class="progression-bar-container">
                        <div class="progression-bar-current" :id="`barGlob-${impact.ressource}`">
                        </div>
                        <div class="progression-bar-impact" :id="`${impact.ressource}`"></div>
                    </div>
                    <div v-if="impact.impact > 0" class="progression-bar-number">+{{ impact.impact }}</div>
                    <div v-if="impact.impact < 0" class="progression-bar-number">{{ impact.impact }}</div>
                    <div v-if="impact.impact == 0" class="progression-bar-number">-</div>
                </div>
            </section>
            <section v-for="n in 5" class="detail-section choice-section" :id="`choix-${n}-section`"
                v-show="activeSection == `choix-${n}`">
                <div class="card-container">
                    <div class="card-back">
                        <h3 class="card-title">{{ props.cardSelection[n - 1].title }}</h3>
                        <p class="card-description">{{ props.cardSelection[n - 1].question }}</p>
                        <div class="card-band">
                            <p class="card-response">{{
                                props.cardSelection[n - 1].responses[props.cardSelection[n - 1].decision].name }}</p>
                        </div>
                    </div>
                </div>
                <div class="bar-container">
                    <div class="detail-progression" v-for="impact of playerChoices[n - 1]">
                        <img class="icon" :src="`src/assets/icons/${impact.ressource}.svg`">
                        <div class="progression-bar-container">
                            <div class="progression-bar-current" :id="`barGlob-choice${n}-${impact.ressource}`"></div>
                            <div class="progression-bar-impact" :id="`choice${n}-${impact.ressource}`"></div>
                        </div>
                        <div v-if="impact.level > 0" class="progression-bar-number">+{{ impact.level }}</div>
                        <div v-if="impact.level < 0" class="progression-bar-number">{{ impact.level }}</div>
                        <div v-if="impact.level == 0" class="progression-bar-number">-</div>
                    </div>
                </div>
            </section>
        </div>

        <button class="back-to-map" @click="$emit('closeRecap'); setNewRessources()">Retour à la carte</button>
    </div>
</template>

<style scoped>
.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 50%;
}

.recap-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 600px;
    background-color: white;
    text-align: center;
}

.content {
    position: absolute;
    bottom: 0;
    height: 85%;
    width: 100%;
}

.navbar {
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center;
}

.navbar-option {
    width: 15%;
    padding-bottom: 5px;
    padding-top: 5px;
    background-color: #D9D9D9;
    cursor: pointer;
}

.active {
    background-color: #F9F7F7;
}

.detail-section {
    background-color: #F9F7F7;
    height: 95%;
    display: flex;
    justify-content: center;
    gap: 25px;
}

.card-container,
.bar-container {
    width: 50%;
}

.bar-container {
    display: flex;
    justify-content: center;
    gap: 25px;
}

.detail-progression {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 25px;
}

.progression-bar-container {
    height: 200px;
    width: 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: column-reverse;
    justify-content: end;
}

.progression-bar-current {
    background-color: black;
    transition: 1s;
}

.progression-bar-impact {
    height: 0;
    transition: 1s;
}

.choice-section {
    display: flex;
}

.back-to-map {
    position: absolute;
    bottom: 0;
    margin-bottom: 40px;
    transform: translate(-50%, 0);
    background-color: black;
    color: white;
}

/* --------------------------- CARDS --------------------------------------- */
.card-container {
    display: flex;
    justify-content: center;
}

.card-back {
    margin-top: 50px;
    background-color: white;
    color: #000;
    position: absolute;
    height: 300px;
    width: 180px;
}

.card-band {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20%;
    background-color: lightblue;
}

.card-title {
    padding: 5px;
    font-size: 1em;
}

.card-description {
    font-size: 0.75em;
}

.card-response {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 90%;
    width: 90%;
    font-size: 0.75em;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

button:hover {
    border-color: #646cff;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}

@media (max-width: 1100px) {
    .recap-container{
        width: 750px;
    }
}
</style>