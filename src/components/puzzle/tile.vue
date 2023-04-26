<script setup>
import tiles from '../../assets/data/tiles.json'
import anime from 'animejs/lib/anime.es.js';
import { ref, computed, reactive, watchEffect } from 'vue'
import { menuOpened } from "../../utils/store.js"
import sound from '../../assets/sounds/Impact_Concrete_Hit_By_Solid_Metal_Bar_02.wav'
//import sound from '../../assets/sounds/Liquid_Water_Filling_Up_Pool_07.wav'

const props = defineProps({
    tileType: {
        type: String,
        // required: true
    },
    tileInfos: {
        type: Object,
    },
    position: {
        type: Array
    },
    dark: {
        type: Boolean,
    }
})




const emit = defineEmits(['rotate'])

const IMG_PATH = 'assets/tiles/'

const correctTile = computed(() => findTile())
const isEnabled = ref(true)
const zIndex = ref(1)
const cursorType = ref('pointer')

let currentRotation = props.tileInfos.rotation

// Disable tile clicks when the menu is opened or if the tile is frozen
// watchEffect(() => {
//     if(menuOpened.value || props.tileInfos.frozen) {
//         isEnabled.value = false
//         cursorType.value = 'default'
//     } else {
//         isEnabled.value = true
//         cursorType.value = 'pointer'
//     }
// })

// Get the tile type to display the correct image


     
    
function findTile() {
    const tile = tiles.find(tile => tile.type === props.tileType)
    let name = IMG_PATH + tile.svg

    props.frozen ?
        name += '-frozen' :
        name += ''

    props.dark ?
    name += '-dark':
    name += ''

    name += '.jpg'
    
    return name
}

// Rotate target 90 degrees clockwise
function rotate(evt) {

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

    emit('rotate')

    playAudio(sound)
}

function playAudio(url) {
    new Audio(url).play();
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