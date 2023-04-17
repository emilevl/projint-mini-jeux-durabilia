<script setup>
import tiles from '../../assets/data/tiles.json'
import anime from 'animejs/lib/anime.es.js';
import { ref, computed, reactive } from 'vue'
import sound from '../../assets/sounds/Impact_Concrete_Hit_By_Solid_Metal_Bar_02.wav'
//import sound from '../../assets/sounds/Liquid_Water_Filling_Up_Pool_07.wav'

const props = defineProps({
    tileType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    rotation: {
        type: Number,
        required: true
    }
})

const correctTile = computed(() => findTile())
const isEnabled = ref(true)

let initRotation = ref(props.rotation)
//img.style.transform = `rotate(${props.rotation}deg)`;

/* anime({
    targets: ''
}) */

const zIndex = ref(1)

function findTile() {
    return tiles.find(tile => tile.type === props.tileType)
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
        }
    }).add({
        scale: [1.1],
    }).add({
        rotate: [initRotation.value, '+=90'],
    }).add({
        scale: [1],
    })

    initRotation.value += 90;
    playAudio(sound)
}

function playAudio(url) {
    new Audio(url).play();
    //console.log(url)
}

</script>

<template>
    <div
        @click="isEnabled && rotate($event)" :style="{zIndex: zIndex}">
        <img :src="correctTile.svg" :style="`transform: rotate(${initRotation}deg)`"> <!--  -->
    </div>
</template>

<style scoped>
img {
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
    z-index: 1;
}
</style>