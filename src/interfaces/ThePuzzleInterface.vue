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
        <grid></grid>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');

/* :root {
    --white: #FDFCFC;
} */

#puzzleInterface {
    font-family: 'Limelight', cursive;
    color: var(--white);
    background-color: #12313c;
    background: radial-gradient(circle, #12313C 0%, #0D0C0C 100%);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin: 0;
}

#puzzleInterface::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-color: #12313c;
    background-image: url(../assets/decor/texture_background.png);
    opacity: 0.2;
}

.aside {
    display: flex;
    justify-content: space-between;
    padding: 25px;
}
</style>