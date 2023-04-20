<script setup>
import { onMounted, ref } from 'vue';
import { transformers } from '../utils/store';

const D_TRANSFORMER_MIN = 150
const D_TRANSFORMER_MAX = 200
const coords = [[300, 180], [750, 250], [500, 550]]

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
        i++
    })
})

function changeHash(e) {
    if (e.target.id == "Tribunal") window.location.hash = "#card"
    if (e.target.id == "Scierie") window.location.hash = "#planche"
    if (e.target.id == "Tuyauterie") window.location.hash = "#puzzle"
}

</script>

<template>
    <h1 class="title">Durabilia</h1>
    <div v-for="transformer of transformers" class="transformer" :id="`${transformer.name}`" @click="changeHash($event)">
        {{ transformer.name }}
    </div>
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
</style>