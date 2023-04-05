<script setup>
import { ref, watchEffect } from 'vue';
import addTime from 'add-time';

const minCounter = 1  // nombre de minutes au timer
let timer = ref(minCounter * 60000)

const time = ref(null)
let paused = ref(false)
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
        }

        if (paused.value) {
            timer.value = distance
            clearInterval(interval)
        }
    }, 0)
}

watchEffect(() =>
{
    if (!paused.value) {
        const newDate = new Date(Date.now() + timer.value);
        startTimer(newDate)
    }
}

)

</script>

<template>
    <div id="chrono">
        <img src="../../assets/icons/chrono.svg">
        <p id="counter">{{ time }}</p>
        <button @click="paused = !paused">pause</button>
    </div>
</template>

<style scoped>
img {
    height: 3vw;
    margin: 0;
    display: inline;
}

#counter {
    display: inline-block;
    font-weight: 600;
    font-size: 3vw;
    margin: 0 0 0 10px;
}
</style>