<script setup>

const nbCols = 5;
const nbRows = nbCols;
const nbTiles = nbCols * nbRows

const nbColsCss = `repeat(${nbCols}, 1fr)`

let sizeGrid = window.innerHeight * 0.9;
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

console.log(path)
</script>

<template>
    <div id="grid" class="grid-container">
        <div v-for="tile in path" class="grid-item">
            <img :class="'deg' + tile.rotation"
                src="https://pbs.twimg.com/profile_images/1433586148350304256/bL2dOWpH_400x400.jpg">
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
}

.grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    width: v-bind(sizeTileCss);
    height: v-bind(sizeTileCss);
}

img {
    max-width: 100%;
    max-height: 100%;
}

img.deg0 {
    transform: rotate(0deg);
}

img.deg1 {
    transform: rotate(90deg);
}

img.deg2 {
    transform: rotate(180deg);
}

img.deg3 {
    transform: rotate(270deg);
}
</style>