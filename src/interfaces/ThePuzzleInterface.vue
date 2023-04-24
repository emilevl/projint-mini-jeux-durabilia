<script setup>
import { ref, watchEffect } from 'vue';
import { ressourceGlobal, transformers } from "../utils/store.js";
import Grid from '../components/puzzle/grid.vue';
import TheMenu from '../components/puzzle/theMenu.vue';
import TheChrono from '../components/puzzle/theChrono.vue';
import { menuOpened } from "../utils/store.js"
import ThePause from "../components/ThePause.vue";
import popupRules from "../components/popupRules.vue";
import TheScore from "../components/puzzle/TheScore.vue";
import winSound from '../assets/sounds/Trumpet_Win.wav'
import loseSound from '../assets/sounds/Trumpet_Lose.wav'

const CURRENT_TRANSFORMER = transformers.value.find(
    (transformer) => transformer.name == "STEP"
)

const activeRules = ref(true)
function toggleRules() {
    activeRules.value = !activeRules.value
}


function toggleMenu() {
    menuOpened.value = !menuOpened.value
}

let finPartie = ref(false)

function partieTerminee(reussi) {
    setTimeout(() => {
        if (reussi) {
            playAudio(winSound)
        } else {
            playAudio(loseSound)
        }
        finPartie.value = true
    }, 750);
}

function playAudio(url) {
    new Audio(url).play();
}

watchEffect(() => {
    console.log(activeRules.value);
    
})

</script>

<template>
    <div id="puzzleInterface">
        <div class="aside">
            <the-menu @toggle-menu="toggleMenu"></the-menu>
            <the-chrono @partieTerminee="partieTerminee" :rulesOpen="activeRules" :jeuReussi="finPartie"></the-chrono>
        </div>
        <grid @partieTerminee="partieTerminee"></grid>
        <ThePause
            v-if="menuOpened"
            :transformer="CURRENT_TRANSFORMER"
            @resumeGame="toggleMenu"
        ></ThePause>
        <popupRules 
            v-if="activeRules" 
            :transformer="CURRENT_TRANSFORMER"
            :gameLaunched="false"
            @emitPlay="toggleRules()"
        ></popupRules>
    </div>
</template>

<style scoped>
/* :root {
    --white: #FDFCFC;
} */

#puzzleInterface {
    font-family: 'Limelight', cursive;
    background-color: #12313c;
    background: radial-gradient(circle, #12313C 0%, #0D0C0C 100%);
    height: 100vh;
    width: 100vw;
    position: relative;
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
    height: 100%;
}
</style>