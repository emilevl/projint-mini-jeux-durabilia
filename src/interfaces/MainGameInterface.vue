<script setup>
import { onMounted, ref } from 'vue';
import { transformers } from '../utils/store';

const D_TRANSFORMER_MIN = 100
const D_TRANSFORMER_MAX = 200

const X_TRANSFORMER_MIN = D_TRANSFORMER_MAX
const X_TRANSFORMER_MAX = window.innerWidth - D_TRANSFORMER_MAX

const Y_TRANSFORMER_MIN = D_TRANSFORMER_MAX
const Y_TRANSFORMER_MAX = window.innerHeight - D_TRANSFORMER_MAX

onMounted(() => {
    const transformerSelector = document.querySelectorAll(".transformer")
    let x = 0
    let y = 0
    let prevValue = [[0, 0]]
    transformerSelector.forEach(transformer => {
        //Random rayon for the transformers
        const d = Math.floor(Math.random() * (D_TRANSFORMER_MAX - D_TRANSFORMER_MIN + 1) + D_TRANSFORMER_MIN)
        transformer.style.height = `${d}px`
        transformer.style.width = `${d}px`
        //Random position for the transformers (And they dont superpose or are too near to each other)
        let incorrectValue = true
        do {
            x = Math.floor(Math.random() * (X_TRANSFORMER_MAX - X_TRANSFORMER_MIN + 1) + X_TRANSFORMER_MIN)
            y = Math.floor(Math.random() * (Y_TRANSFORMER_MAX - Y_TRANSFORMER_MIN + 1) + Y_TRANSFORMER_MIN)
            prevValue.forEach(point => {
                if (Math.abs(point[0] - x) > (D_TRANSFORMER_MAX)+50 && Math.abs(point[1] - y) > (D_TRANSFORMER_MAX)+50){
                    console.log("valeur ok!" + point[0]+ " " + x)
                    incorrectValue = false
                } 
            })
        } while (incorrectValue);
        prevValue.push([x, y])

        transformer.style.left = `${x}px`
        transformer.style.top = `${y}px`
    })
})

</script>

<template>
    <div v-for="transformer of transformers" class="transformer" :id="`transformer-${transformer.name}`">
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
</style>