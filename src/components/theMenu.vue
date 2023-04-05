<script setup>
import { ref, watchEffect } from "vue";
import { menuOpened } from "../store.js"

// let menuOpened = ref(false)

/* watchEffect(() =>
    //console.log("store" + menuOpen),
    console.log("local" + menuOpened.value)
) */

function toggleMenu() {
    menuOpened.value = !menuOpened.value
}
</script>

<template>
    <div>
        <p @click="$emit('toggleMenu')">MENU</p>
        <p v-if="menuOpened">menu à écrire</p>
    </div>
</template>

<style scoped>
p {
    font-weight: 600;
    font-size: 3vw;
    margin: 5px 0 0 0;
}
</style>