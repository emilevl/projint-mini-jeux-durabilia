<script setup>
import { ref, watchEffect } from "vue";
import { menuOpen } from "../store.js"

let menuOpened = ref(menuOpen)

/* watchEffect(() =>
    //console.log("store" + menuOpen),
    console.log("local" + menuOpened.value)
) */
</script>

<template>
    <p @click="menuOpened = !menuOpened">MENU</p>
    <p v-if="menuOpen">menu à écrire</p>
</template>

<style scoped>
p {
    font-weight: 600;
    font-size: 3vw;
    margin: 5px 0 0 0;
}
</style>