<script setup>
// https://codepen.io/AllThingsSmitty/pen/JJavZN?editors=0010

import { ref } from 'vue';
import addTime from 'add-time';

const time = ref(null)

const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

const today = new Date();

let timer = 1;
const newDate = addTime.now({ minutes: timer });
let distance = timer * minute
let min, sec
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
}, 0)

</script>

<template>
    <div id="chrono">
        <img src="../../assets/icons/chrono.svg">
        <p id="counter">{{ time }}</p>
    </div>
</template>

<style scoped>
img {
    height: 3vw;
    margin: 0;
    display: inline;
}

p {
    display: inline-block;
    font-weight: 600;
    font-size: 3vw;
    margin: 0 0 0 10px;
}
</style>