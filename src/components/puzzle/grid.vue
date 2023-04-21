<script setup>
import Tile from '../puzzle/tile.vue'
import { generateMatrix } from '../../utils/generateRandomPath.js';
import { computed, watchEffect, ref } from 'vue'
import {VerifyMatrix} from '../../utils/verifyPuzzle.js'

const nbCols = 5;
const nbRows = nbCols;
const nbTiles = nbCols * nbRows
const arrival = [nbCols - 1, nbRows - 1]
const lengthPath = 10; //entre 8 et 10 p.ex

const maxFrozenTiles = 2; // maximum number of frozen tiles on the grid
let frozenTilesCounter = 0;
const freezeFrequency = 0.05; // how often tile freeze happens

const nbColsCss = `repeat(${nbCols}, 1fr)`


const matrix = generateMatrix(arrival, nbRows, nbCols, lengthPath)

const rotations = [0, 90, 180, 270]

function randomizeRotation(position) {
    let randomInt = Math.floor(Math.random() * rotations.length)
    // let randomInt = 0
    let i = 0

    while (i < randomInt) {
        rotateSides(position)
        i++
    }

    return rotations[randomInt]
}

function randomizeFreeze() {
    let frozen = false

    if (frozenTilesCounter >= maxFrozenTiles) return frozen

    if (Math.random() <= freezeFrequency) {
        frozen = true
        frozenTilesCounter++
    }

    return frozen
}

function rotateSides(position) {
    console.log(matrix);
    //console.log(matrix[position[0]][position[1]].sides);

    let last = matrix[position[0]][position[1]].sides.pop();
    matrix[position[0]][position[1]].sides.unshift(last);

    //console.log(matrix[position[0]][position[1]].sides);
    

    //console.log(matrix[position[0]][position[1]].sides);
}

</script>

<template>
    <div>
        <img id="pipe_start" src="../../assets/decor/pipe_left.png">
        <img id="img_start" src="../../assets/decor/freeze_left.png">
        <img id="pipe_end" src="../../assets/decor/pipe_right.png">
        <img id="img_end" src="../../assets/decor/freeze_right.png">
        <div id="grid" class="grid-container">
            <template v-for="(row, r) in matrix">
                <div v-for="(col, c) in row" class="grid-item">
                    <tile :tileType="col.type" :rotation="randomizeRotation([r, c])" @rotate="rotateSides([r, c])">
                    </tile>
                    <!-- :frozen="randomizeFreeze()" -->
                </div>
            </template>
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