<script setup>
import { ref } from 'vue';
import Grid from '../components/puzzle/grid.vue';
import TheMenu from '../components/theMenu.vue';
import TheChrono from '../components/puzzle/theChrono.vue';
import { menuOpened } from "../store.js"

function onToggleMenu() {
    menuOpened.value = !menuOpened.value
}

</script>

<template>
    <div id="puzzleInterface">
        <div class="aside">
            <the-chrono></the-chrono>
            <the-menu @toggle-menu="onToggleMenu"></the-menu>
        </div>
        <grid id="grid"></grid>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');

:root {
    --white: #FDFCFC;
}

body {
    font-family: 'Limelight', cursive;
    color: var(--white);
    
    background: radial-gradient(circle, #12313C 0%, #0D0C0C 100%);
    background-color: #12313c;

    /* background-image: url(../assets/decor/texture_background.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
}

.aside {
    display: flex;
    justify-content: space-between;
    padding: 25px;
}
</style>