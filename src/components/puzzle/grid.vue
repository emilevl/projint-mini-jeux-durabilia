<script setup>
import Tile from '../puzzle/tile.vue'
import { generateMatrix } from '../../utils/generateRandomPath.js';

const nbCols = 5;
const nbRows = nbCols;
const nbTiles = nbCols * nbRows
const arrival = [nbCols - 1, nbRows - 1]
const lengthPath = 10; //entre 8 et 10 p.ex

const nbColsCss = `repeat(${nbCols}, 1fr)`


const matrix = generateMatrix(arrival, nbRows, nbCols, lengthPath)
const flatMatrix = matrix.flat()
//console.log(flatMatrix);

const rotations = [0, 90, 180, 270]
const randomRotation = Math.floor(Math.random() * rotations.length);
//console.log(rotations[Math.floor(Math.random() * rotations.length)]);


</script>

<template>
    <img id="pipe_start" src="../../assets/decor/pipe_left.png">
    <img id="img_start" src="../../assets/decor/freeze_left.png">
    <img id="pipe_end" src="../../assets/decor/pipe_right.png">
    <img id="img_end" src="../../assets/decor/freeze_right.png">
    <div id="grid" class="grid-container">
        <div v-for="(tile, i) in flatMatrix" class="grid-item">
            <tile :tileType="tile" :position="i++" :rotation="rotations[Math.floor(Math.random() * rotations.length)]">
            </tile>
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: v-bind(nbColsCss);
    margin: 0 auto;

    height: fit-content;
    width: fit-content;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.grid-item {
    background-color: #12313C;
    width: 16vh;
    height: 16vh;
}

img {
    height: 48vh;
    position: absolute;
    margin: 0 auto;
}

#img_start {
    top: 10vh;
    left: 50%;
    transform: translate(-300%, 0%);
}

#img_end {
    bottom: 10vh;
    right: 50%;
    transform: translate(300%, 0%);
}

#pipe_start {
    top: 10vh;
    left: 50%;
    transform: translate(-180%, 0%);
}

#pipe_end {
    bottom: 10vh;
    right: 50%;
    transform: translate(180%, 0%);
}


@media (orientation: portrait) {
    .grid-item {
        width: 16vw;
        height: 16vw;
    }

    img {
        height: 48vw;
    }

    /* #img_start {
        top: 10vw;
        left: 50%;
        transform: translate(-213%, 0%);
    }

    #img_end {
        bottom: 10vw;
        right: 50%;
        transform: translate(213%, 0%);
    } */
}
</style>