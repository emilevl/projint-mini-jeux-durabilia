<script setup>
import { ref } from 'vue';

const props = defineProps({
    ressourcesImpacted: Array
})

const RESSOURCES_TEST = [[{ ressource: "lifeAquatic", level: -10 }, { ressource: "energy", level: 10 }], [{ ressource: "inequality", level: 10 }, { ressource: "peaceJustice", level: -20 }], [{ ressource: "genderEquality", level: 10 }, { ressource: "energy", level: 20 }], [{ ressource: "climateActions", level: 10 }], [{ ressource: "education", level: -20 }]]

const emit = defineEmits([
    'closeRecap',
]);

let totalImpact = ref([
    {ressource:"climateActions", impact:0, currentLevel: 20},
    {ressource:"communities", impact:0, currentLevel: 15},
    {ressource:"consumption", impact:0, currentLevel: 40},
    {ressource:"decentWork", impact:0, currentLevel: 32},
    {ressource:"education", impact:0, currentLevel: 21},
    {ressource:"energy", impact:0, currentLevel: 0},
    {ressource:"genderEquality", impact:0, currentLevel: 35},
    {ressource:"health", impact:0, currentLevel: 37},
    {ressource:"hunger", impact:0, currentLevel: 26},
    {ressource:"inequality", impact:0, currentLevel: 47},
    {ressource:"innovation", impact:0, currentLevel: 20},
    {ressource:"lifeAquatic", impact:0, currentLevel: 20},
    {ressource:"lifeLand", impact:0, currentLevel: 10},
    {ressource:"partnership", impact:0, currentLevel: 15},
    {ressource:"peaceJustice", impact:0, currentLevel: 18},
    {ressource:"poverty", impact:0, currentLevel: 56},
    {ressource:"water", impact:0, currentLevel: 23},
])

let activeSection = ref("recap")
function changeSection(id) {
    activeSection.value = id
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
                        <div class="progression-bar-current"></div>
                        <div class="progression-bar-impact"></div>
                    </div>
                </div>
            </section>
            <section v-for="n in 5" class="detail-section" :id="`choix-${n}-section`" v-show="activeSection == `choix-${n}`">
                
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
}

.progression-bar-current {
    background-color: black;
    height: 20%;
}

.progression-bar-impact {
    
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