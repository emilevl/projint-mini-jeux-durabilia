<script setup>
import Tile from '../puzzle/tile.vue'
import { generateMatrix } from '../../utils/generateRandomPath.js';
import { VerifyMatrix } from '../../utils/verifyPuzzle.js';
import { computed, watchEffect, ref, reactive } from 'vue'

const emit = defineEmits(['partieTerminee'])



const nbCols = 5;
const nbRows = nbCols;
const nbTiles = nbCols * nbRows
const arrival = [nbCols-1 , nbRows -1]
const lengthPath = 12; //entre 8 et 10 p.ex

const maxFrozenTiles = 2; // maximum number of frozen tiles on the grid
let frozenTilesCounter = 0;
const freezeFrequency = 0.05; // how often tile freeze happens

const nbColsCss = `repeat(${nbCols}, 1fr)`

const matrix = generateMatrix(arrival, nbRows, nbCols, lengthPath)

const rotations = [0, 90, 180, 270]
let totalRandom = 0;

function randomizeRotation(position) {

    // const frozen = randomizeFreeze()
    const frozen = false

    let randomInt = frozen ? 0 : Math.floor(Math.random() * rotations.length)
    let i = 0
    totalRandom += randomInt;
    while (i < randomInt) {
        rotateSides(position)
        i++
    }
    return {
        rotation: rotations[randomInt],
        frozen: frozen
    }
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


let totalRotate = 0;

    function rotateSides(position) {
    let last = matrix[position[0]][position[1]].sides.pop();
    matrix[position[0]][position[1]].sides.unshift(last);
    let VerifiedMatrix = VerifyMatrix(matrix);

    console.log("matrice verif", VerifiedMatrix[0]);
    if (VerifiedMatrix != undefined && VerifiedMatrix[1] == true) {
        //console.log('FINI')
        emit('partieTerminee', true)
    }

 totalRotate++
    if(totalRotate>totalRandom){
       lightPath(VerifiedMatrix)
}



}

function lightPath(VerifiedMatrix){
    const firstTile = document.querySelector('[data-id="0-0"] img');
            const firstTileSrc =firstTile.getAttribute('src');
            console.log("matrix sides",matrix[0][0].sides)
        if(matrix[0][0].sides[3]==1){
            if(firstTileSrc.includes('-dark.svg')){
                   const newSource = firstTileSrc.replace('-dark.svg', '.svg')
                   firstTile.setAttribute('src', newSource);
               }
        }else{
            if(!firstTileSrc.includes('-dark.svg')){
                const newSource = firstTileSrc.replace('.svg', '-dark.svg');
                firstTile.setAttribute('src', newSource);
                }
        }
     for(let row=0; row<5; row++){
   
     for(let col=0; col<5; col++){
        if(row==0 && col==0){

        }else{
        const tileImg = document.querySelector(`[data-id="${row}-${col}"] img`);
        const tileSrc = tileImg.getAttribute('src');
               if(VerifiedMatrix[0][row][col]){
               
                if(tileSrc.includes('-dark.svg')){
                   
                   const newSource = tileSrc.replace('-dark.svg', '.svg')
                   tileImg.setAttribute('src', newSource);
               }
               }else{
               
                

                if(!tileSrc.includes('-dark')){
                const newSource = tileSrc.replace('.svg', '-dark.svg');
                tileImg.setAttribute('src', newSource);
                }
                
               
               
               }
            
            }
        }
        
    }
}



</script>

<template>
    <div>
        <img id="pipe_start" src="../../assets/decor/pipe_left.png">
        <img id="img_start" src="../../assets/decor/freeze_left.png">
        <img id="pipe_end" src="../../assets/decor/pipe_right.png">
        <img id="img_end" src="../../assets/decor/freeze_right.png">
        <!-- <div id="grid-box"> -->
            <div id="grid" class="grid-container">
                <template v-for="(row, r) in matrix">
                    <div v-for="(col, c) in row" class="grid-item" >
                        <tile :data-id="`${r}-${c}`" :tileType="col.type" :tileInfos="randomizeRotation([r, c])" @rotate="rotateSides([r, c])" :dark="true" >
                        </tile>
                        <!-- :frozen="randomizeFreeze()" -->
                    <!-- :frozen="newMatrix[r][c].value" -->
                    <!--:dark="col"-->
                    </div>
                </template>
            </div>
        <!-- </div> -->
    </div>
</template>

<style scoped>

/* .grid-container::after {
    display: none;
}
#grid-box {
    display: grid;
} */

/* position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden; */
.grid-container {
    display: grid;
    grid-template-columns: v-bind(nbColsCss);
    margin: 0 auto;

    /* height: fit-content;
    width: fit-content; */

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.grid-item {

    background-color: #12313C;
    width: 18vh; 
    height: 18vh;
    width: 18dvh;
    height: 18dvh;
}

img {
    height: 36vh;
    height: 36dvh;
    position: absolute;
    margin: 0 auto;
}

#img_start {
    top: 5vh;
    top: 5dvh;
    left: 50%;
    transform: translate(-300%, 0%);
}

#img_end {
    bottom: 5vh;
    bottom: 5dvh;
    right: 50%;
    transform: translate(300%, 0%);
}

#pipe_start {
    top: 5vh;
    top: 5dvh;
    left: 50%;
    transform: translate(-180%, 0%);
}

#pipe_end {
    bottom: 5vh;
    bottom: 5dvh;
    right: 50%;
    transform: translate(180%, 0%);
}
</style>