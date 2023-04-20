<script setup>
import { onMounted, ref } from 'vue';
import { ressourceGlobal } from '../utils/store';
import popupRules from "../components/popupRules.vue"
import ButtonComponent from './ButtonComponent.vue';

const props = defineProps({
    transformer: Object
})

const emit = defineEmits([
    'resumeGame',
]);

function leaveGame() {
    // ask for confirmation
    if (confirm('Voulez-vous vraiment quitter la partie ?', 'Oui', 'Non')) {
        window.location.hash = ""
    }
}




const showRules = ref(false)
function toggleRules() {
    showRules.value = !showRules.value

}

function launchCinematique() {
    console.log("cinématique lancée")
}

</script>

<template>
    <div class="background" @click="$emit('resumeGame')"></div>
    <div class="pause-container">
        <h3 class="close-x" @click="$emit('resumeGame')">X</h3>
        <div class="pause-details-container">
            <h2 class="title">PAUSE</h2>
            <img class="pause-deco" src="/assets/icons/pause-deco.svg">
            <div class="content">
                <ButtonComponent class="menu-option" @click="$emit('resumeGame')">Reprendre</ButtonComponent>
                <ButtonComponent class="menu-option" @click="toggleRules()">Règles</ButtonComponent>
                <ButtonComponent class="menu-option" @click="launchCinematique()">Cinématique</ButtonComponent>
                <ButtonComponent class="menu-option" @click="leaveGame()">Quitter</ButtonComponent>
            </div>
        </div>
    </div>
    <popupRules v-if="showRules" :transformer="props.transformer" :gameLaunched="false" @emitToggleRules="toggleRules()"
        @emitPlay="$emit('resumeGame')"></popupRules>
</template>

<style scoped>
.background {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 50%;
}

.close-x {
    cursor: pointer;
    position: absolute;
    left: 100%;
    transform: translate(-100%, 0);
    line-height: 1;
    padding: 30px;
}

.pause-container {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 550px;
    background-color: #FBF8F1;
}

.pause-details-container {
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 450px;
}

.pause-deco {
    width: 100%;
}

.content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 1.5rem;
}

.title {
    margin: 0;
    padding: 20px;
    text-align: center;
}


@media screen and (max-width: 800px) {
    .pause-container {
        width: 300px;
        height: 300px;
    }

    .pause-details-container {
        padding: 25px;
        height: 250px;
    }

    .close-x {
        padding: 25px;
    }

    .title {
        font-size: 1.5em;
        padding: 10px;
    }

    .content {
        font-size: 1rem
    }
}

@media screen and (max-width: 1050px) {
    .pause-container {
        width: 300px;
        height: 300px;
    }

    .pause-details-container {
        padding: 25px;
        height: 250px;
    }

    .close-x {
        padding: 25px;
        font-size: 1.5em;
    }

    .title {
        font-size: 1.5em;
        padding: 10px;
    }

    .content {
        font-size: 1rem
    }

    .menu-option {
        background-color: unset;
        color: unset;
    }
}
</style>