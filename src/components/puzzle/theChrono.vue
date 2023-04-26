<script setup>
import { ref, watchEffect } from 'vue';
import addTime from 'add-time';
import { menuOpened } from "../../utils/store.js"
import anime from 'animejs/lib/anime.es.js';
import beepSound from '../../assets/sounds/beep.wav'

const props = defineProps({
    jeuReussi: {
        type: Boolean,
        required: true
    },
    rulesOpen: {
        type: Boolean,
        required: true
    }
})

const chrono = ref(null)

const emit = defineEmits(['partieTerminee'])

const minCounter = 1  // nombre de minutes au timer
let timer = ref(minCounter * 60000)

const time = ref(null)
let distancePause = ref(null)

const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

const today = new Date();

let distance
let min, sec

// countdown
function startTimer(newDate) {
    const interval = setInterval(function () {
        const now = new Date().getTime()
        distance = newDate - now

        const secondes = Math.floor(distance % minute / second)
        const minutes = Math.floor((distance % (hour)) / (minute))

        min = `0${minutes}`
        if (secondes < 10) {
            sec = `0${secondes}`
        } else {
            sec = secondes
        }

        time.value = `${min}:${sec}`

        if (distance <= 0) {
            clearInterval(interval)
            time.value = "FIN"
            emit('partieTerminee', false)
        }

        if (props.jeuReussi) {
            clearInterval(interval)
            time.value = "FIN"
        }
        

        if (menuOpened.value) {
            timer.value = distance
            clearInterval(interval)
        }

        if (min == '00' && sec <= '10') playAudio(beepSound)

    }, 1000)
}

function animChrono() {
  setTimeout(() => {
    anime.timeline({
        targets: '#chrono',
        easing: 'linear',
        duration: 300,
    }).add({
        scale: [1.2],
    }).add({
        scale: [1],
    }).add({
        scale: [1.2],
    }).add({
        scale: [1],
})
  }, 500);
}

watchEffect(() => {
    if (!menuOpened.value) {
        const newDate = new Date(Date.now() + timer.value);
        startTimer(newDate)
        animChrono()
    }
})

function playAudio(url) {
    new Audio(url).play();
}
</script>

<template>
    <div id="chrono">
        <img id="chrono-top" src="../../assets/decor/chrono_top.svg">
        <p id="counter">{{ time }}</p>
        <img id="chrono-bottom" src="../../assets/decor/chrono_bottom.svg">
    </div>
</template>

<style scoped>
img {
    height: 2vw;
    margin: 0;
    display: inline;
}

#counter {
    font-family: "Limelight", Inter, system-ui, Avenir, Helvetica, Arial,
        sans-serif;
    color: #FDFCFC;
    display: inline-block;
    font-size: 3vw;
    margin: auto;
}

#chrono {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: fit-content;
    padding: 25px;

    align-self: flex-start;
}
</style>