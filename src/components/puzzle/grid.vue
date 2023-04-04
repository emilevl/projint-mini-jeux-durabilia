<script setup>
import Tile from '../puzzle/tile.vue'

const nbCols = 5;
const nbRows = nbCols;
const nbTiles = nbCols * nbRows

const nbColsCss = `repeat(${nbCols}, 1fr)`

let sizeGrid = window.innerHeight * 0.7;
let sizeTile = sizeGrid / nbCols;
let sizeTileCss = `${sizeTile}px`

let path = []

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

for (let i = 0; i < nbTiles; i++) {
    //let rot = getRandomInt(0, 4)
    path.push({
        tileType: 1,
        position: [0, 1],
        rotation: 0
    })
}
</script>

<template>
    <div id="grid" class="grid-container">
        <div v-for="(tile, i) in nbTiles" class="grid-item">
            <tile
                :tileType="'2b'"
                :position="i++"
                :rotation="90"
            ></tile>
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: v-bind(nbColsCss);
    /* background-color: #2196F3; */
    /* padding: 2%; */
    margin: 0 auto;

    height: fit-content;
    width: fit-content;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* padding: 2%; */
}

.grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    width: 16vh;
    height: 16vh;
}

@media (orientation: portrait) {
  .grid-item {
    width: 16vw;
    height: 16vw;
  }
}
</style>