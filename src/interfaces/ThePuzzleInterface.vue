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
    <div class="aside">
        <the-chrono></the-chrono>
        <the-menu @toggle-menu="onToggleMenu"></the-menu>
    </div>
    <grid id="grid"></grid>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

:root {
    --darkgrey: #2E2E2E;
    --lightgrey: #D9D9D9;
    --white: #FDFCFC;
}

body {
    font-family: 'Inter', sans-serif;
    color: var(--white);
    background-color: #12313C;
}

.aside {
    padding: 25px 25px 0 0;
    text-align: right;
}
</style>