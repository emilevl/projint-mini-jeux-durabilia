<script setup>
import tiles from '../../assets/data/tiles.json'
import anime from 'animejs/lib/anime.es.js';
import { ref, computed, reactive, watchEffect } from 'vue'
import { menuOpened } from "../../store.js"
import sound from '../../assets/sounds/Impact_Concrete_Hit_By_Solid_Metal_Bar_02.wav'
//import sound from '../../assets/sounds/Liquid_Water_Filling_Up_Pool_07.wav'

const props = defineProps({
    tileType: {
        type: String,
        // required: true
    },
    rotation: {
        type: Number,
        // required: true
    },
    frozen: {
        type: Boolean,
        // required: false
    },
    matrix: {
        type: Array
    },
    position: {
        type: Array
    }
})

const emit = defineEmits(['rotate'])

const IMG_PATH = 'src/assets/icons/tiles/'

const correctTile = computed(() => findTile())
const isEnabled = ref(true)
const zIndex = ref(1)
const cursorType = ref('pointer')

let currentRotation = props.rotation

// Disable tile clicks when the menu is opened or if the tile is frozen
/* watchEffect(() => {
    if(menuOpened.value || props.frozen) {
        isEnabled.value = false
        cursorType.value = 'default'
    } else {
        isEnabled.value = true
        cursorType.value = 'pointer'
    }
}) */

// Get the tile type to display the correct image
function findTile() {
    const tile = tiles.find(tile => tile.type === props.matrix[props.position[0]][props.position[1]].type)
    let name = IMG_PATH + tile.svg

    props.frozen ?
        name += '-frozen.svg' :
        name += '.svg'

    return name
}

// Rotate target 90 degrees clockwise
function rotate(evt) {
    console.log(props.matrix)

    anime.timeline({
        targets: evt.target,
        easing: 'linear',
        duration: 150,
        begin: function(anim) {
            zIndex.value = 999
            isEnabled.value = false
        },
        complete: function (anim) {
            zIndex.value = 1
            isEnabled.value = true
            currentRotation += 90;
        }
    }).add({
        scale: [1.1],
    }).add({
        rotate: '+=90',
    }).add({
        scale: [1],
    })

    rotateSides(props.position)

    playAudio(sound)
}

function playAudio(url) {
    new Audio(url).play();
}

function rotateSides(position) {
    //console.log(position);
    //console.log(matrix[position[0]][position[1]].sides);

    let last = props.matrix[position[0]][position[1]].sides.pop();
    props.matrix[position[0]][position[1]].sides.unshift(last);

    //console.log(matrix[position[0]][position[1]].sides);
    

    //console.log(matrix[position[0]][position[1]].sides);
}

</script>

<template>
    <div
        @click="isEnabled && rotate($event)"> <!-- !props.frozen -->
        <img 
            :src="correctTile"
            :style="{transform: `rotate(${currentRotation}deg)`, zIndex: zIndex, cursor: cursorType}"
        >
    </div>
</template>

<style scoped>
img {
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
    position: relative;
}
</style>