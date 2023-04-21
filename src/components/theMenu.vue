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
    <div id="menuBtn">
        <p @click="$emit('toggleMenu')">MENU</p>
    </div>
</template>

<style scoped>
p {
    font-family: "Limelight", Inter, system-ui, Avenir, Helvetica, Arial,
    sans-serif;
    font-weight: 600;
    font-size: 3vw;
    margin: 0.05vw 3.6vw 0.05vw 3.6vw;
    cursor: pointer;
}

#menuBtn {
    margin-top: auto;
    margin-bottom: auto;

    background-image: url(../assets/decor/menu.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: fit-content;
    width: fit-content;

    margin: 25px;
    align-self: flex-end;
}

</style>