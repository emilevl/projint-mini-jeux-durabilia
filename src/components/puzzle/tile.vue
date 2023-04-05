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


const styleObject = reactive({
    //   transform: `rotate(${props.rotation}deg)`,
    zIndex: '1'
})

function findTile() {
    return tiles.find(tile => tile.type === props.tileType)
}

function rotate(evt) {

    anime.timeline({
        targets: evt.target,
        easing: 'linear',
        duration: 200,
        begin: function (anim) {
            styleObject.zIndex = 999
            isEnabled.value = false
        },
        complete: function (anim) {
            styleObject.zIndex = 1
            isEnabled.value = true
        }
    }).add({
        scale: [1.1],
    }).add({
        rotate: '+=90',
    }).add({
        scale: [1],
    })

    playAudio(sound)

}

function playAudio(url) {
    new Audio(url).play();
    //console.log(url)
}

</script>

<template>
    <div
        @click="isEnabled && rotate($event)">
        <img :src="correctTile.svg" :style="styleObject">
    </div>
</template>

<style scoped>
img {
    position: relative;
    max-width: 100%;
    max-height: 100%;
}
</style>