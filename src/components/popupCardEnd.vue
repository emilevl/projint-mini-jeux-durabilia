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
    for (let [i, card] of props.cardSelection.entries()) {
        for (let impact of card.responses[card.decision].impact) {
            playerChoices.value[i].push(impact)
        }
        console.log(playerChoices)
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
                    if (dataEntry.currentLevel + impact.level <= 0) {
                        dataEntry.impact = -dataEntry.currentLevel
                        impact.level = -dataEntry.currentLevel
                    } else if (dataEntry.currentLevel + impact.level >= 100) {
                        dataEntry.impact = 100 - dataEntry.currentLevel
                        impact.level = 100 - dataEntry.currentLevel
                    } else {
                        dataEntry.impact += impact.level
                    }
                }
            }
        }
    }
}

onMounted(() => {
    setTimeout(() => getPlayerChoices(), 50)
    setTimeout(() => updateImpactData(), 50)
    setTimeout(() => showBars(), 50)
    setTimeout(() => showChange(), 500)
})

function showBars() {
    for (let impact of totalImpact.value) {
        const barPrincipal = document.querySelector(`#barGlob-${impact.ressource}`)
        for (let ressource of ressourceGlobal.value) {
            if (ressource.name == impact.ressource) barPrincipal.style.height = `${(Math.abs(ressource.currentLevel) / 100) * 200}px`
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let impact of playerChoices.value[i]) {
            const barPrincipal = document.querySelector(`#barGlob-choice${i+1}-${impact.ressource}`)
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
        bar.style.height = `${(Math.abs(impact.impact) / 100) * 200}px`
        if (impact.impact < 0) {
            bar.style.backgroundColor = "red"
            bar.style.transform = `translate(0, ${(Math.abs(impact.impact) / 100) * 200}px)`
        }
        if (impact.impact > 0) bar.style.backgroundColor = "green"
    }
    //For the choices
    for (let i = 0; i < 5; i++) {
        for (let impact of playerChoices.value[i]) {
            const bar = document.querySelector(`#choice${i + 1}-${impact.ressource}`)
            bar.style.height = `${(Math.abs(impact.level) / 100) * 200}px`
            if (impact.level < 0) {
                bar.style.backgroundColor = "red"
                bar.style.transform = `translate(0, ${(Math.abs(impact.level) / 100) * 200}px)`
            }
            if (impact.level > 0) bar.style.backgroundColor = "green"
        }
    }
}

//Manage the nav between the choices
let activeSection = ref("recap")
function changeSection(id) {
    activeSection.value = id
    for (let impact of totalImpact.value) {
        const bar = document.querySelector(`#${impact.ressource}`)
        bar.style.height = `0px`
        bar.style.transform = `translate(0,0)`
    }
    for (let i = 0; i < 5; i++) {
        for (let impact of playerChoices.value[i]) {
            const bar = document.querySelector(`#choice${i + 1}-${impact.ressource}`)
            bar.style.height = `0px`
            bar.style.transform = `translate(0,0)`
        }
    }
    setTimeout(() => showChange(), 500)
}
</script>

<template>
    <div class="background" @click="$emit('closeRecap')"></div>
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
                    card
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

        <button class="back-to-map" @click="$emit('closeRecap')">Retour à la carte</button>
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
</style>