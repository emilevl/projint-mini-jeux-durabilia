<script setup>
import { onMounted, ref } from 'vue';
import { transformers } from '../utils/store';
import popupRules from '../components/popupRules.vue';
import Cinematic from '../components/Cinematic.vue';

const D_TRANSFORMER_MIN = 150
const D_TRANSFORMER_MAX = 200
const coords = [[15, 20], [75, 30], [50, 55]]

onMounted(() => {
    const transformerSelector = document.querySelectorAll(".transformer")
    let i = 0
    transformerSelector.forEach(transformer => {
        //Random rayon for the transformers
        const d = Math.floor(Math.random() * (D_TRANSFORMER_MAX - D_TRANSFORMER_MIN + 1) + D_TRANSFORMER_MIN)
        transformer.style.height = `${d}px`
        transformer.style.width = `${d}px`
        transformer.style.top = `${coords[i][1]}vh`
        transformer.style.left = `${coords[i][0]}vw`
        i++
    })
})

//For the rules, if empty means not showing any rules
const activeRules = ref("")
const CURRENT_TRANSFORMER = ref("")
function toggleRules(e) {
    //Get transformer that we clicked
    if (e) {
        CURRENT_TRANSFORMER.value = transformers.value.find(
            (transformer) => transformer.name == e.target.id
        );
    }

    //show the rules or hide
    if (activeRules.value == "") {
        activeRules.value = e.target.id
    } else {
        activeRules.value = ""
    }
}

const cinematiqueShow = ref("")
function launchCinematique(transformer) {
    activeRules.value = ""
    cinematiqueShow.value = transformer
}

//Change the hash to go to the minigames
function changeHash(transformerName) {
    const hash = transformers.value.find((transfo) => transfo.name == transformerName).hash;
    window.location.hash = `#${hash}`
}

</script>

<template>
    <div v-show="cinematiqueShow == ''" class="main-interface-container">
        <h1 class="title">Durabilia</h1>
        <div v-for="transformer of transformers" class="transformer"
            :id="`${transformer.name}`" @click="toggleRules($event)">
            {{ transformer.name }}
        </div>
    </div>

    <popupRules v-if="activeRules == 'Tribunal'" :transformer="CURRENT_TRANSFORMER" :gameLaunched="false"
        @emitPlay="launchCinematique('Tribunal')" @emitBackToGame="toggleRules()"></popupRules>
    <popupRules v-if="activeRules == 'Scierie'" :transformer="CURRENT_TRANSFORMER" :gameLaunched="false"
        @emitPlay="launchCinematique('Scierie')" @emitBackToGame="toggleRules()"></popupRules>
    <popupRules v-if="activeRules == 'STEP'" :transformer="CURRENT_TRANSFORMER" :gameLaunched="false"
        @emitPlay="launchCinematique('STEP')" @emitBackToGame="toggleRules()"></popupRules>
    <cinematic v-if="cinematiqueShow != ''" :transformer="cinematiqueShow" @emitPlay="changeHash(cinematiqueShow)">
    </cinematic>
</template>

<style scoped>
.transformer {
    position: absolute;
    background-color: #FFD7B2;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.title {
    text-align: center;
    padding-top: 30px;
}

@media screen and (max-width: 1050px) {
    .title {
        font-size: 1.5em;
    }

    .transformer {
        font-size: 0.8em;
    }
}
</style>