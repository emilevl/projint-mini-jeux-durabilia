<script setup>
import { onMounted, ref } from 'vue';
import { transformers } from '../utils/store';
import popupRules from '../components/popupRules.vue';

const D_TRANSFORMER_MIN = 150
const D_TRANSFORMER_MAX = 200
const coords = [[300, 180], [750, 250], [500, 550]]
const coordsMobile = [[100, 180], [700, 250], [500, 200]]

onMounted(() => {
    const transformerSelector = document.querySelectorAll(".transformer")
    let i = 0
    transformerSelector.forEach(transformer => {
        //Random rayon for the transformers
        const d = Math.floor(Math.random() * (D_TRANSFORMER_MAX - D_TRANSFORMER_MIN + 1) + D_TRANSFORMER_MIN)
        transformer.style.height = `${d}px`
        transformer.style.width = `${d}px`
        transformer.style.top = `${coords[i][1]}px`
        transformer.style.left = `${coords[i][0]}px`
        if (window.innerWidth < 1050) {
            transformer.style.height = `${d / 2}px`
            transformer.style.width = `${d / 2}px`
            transformer.style.top = `${coordsMobile[i][1]}px`
            transformer.style.left = `${coordsMobile[i][0]}px`
        }
        i++
    })
})

//For the rules, if empty means not showing any rules
const activeRules = ref("")
const CURRENT_TRANSFORMER = ref("")
function toggleRules(e) {
    //Get transformer that we clicked
    CURRENT_TRANSFORMER.value = transformers.value.find(
        (transformer) => transformer.name == e.target.id
    );
    //show the rules of hide
    if (activeRules.value == "") {
        activeRules.value = e.target.id
    } else {
        activeRules.value = ""
    }
}

function changeHash(hash) {
    activeRules.value = ""
    window.location.hash = hash
}

</script>

<template>
    <h1 class="title">Durabilia</h1>
    <div v-for="transformer of transformers" class="transformer" :id="`${transformer.name}`" @click="toggleRules($event)">
        {{ transformer.name }}
    </div>
    <popupRules v-if="activeRules == 'Tribunal'" :transformer="CURRENT_TRANSFORMER" :gameLaunched="false"
        @emitPlay="changeHash('#card')"></popupRules>
    <popupRules v-if="activeRules == 'Scierie'" :transformer="CURRENT_TRANSFORMER" :gameLaunched="false"
        @emitPlay="changeHash('#planche')"></popupRules>
    <popupRules v-if="activeRules == 'STEP'" :transformer="CURRENT_TRANSFORMER" :gameLaunched="false"
        @emitPlay="changeHash('#puzzle')"></popupRules>
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