<script setup>
import { onMounted, ref } from 'vue';
import { ressourceGlobal } from '../utils/store';
import popupRules from "../components/popupRules.vue"
import ButtonComponent from './ButtonComponent.vue';
import popupQuit from "../components/popupQuit.vue"
import Cinematic from './Cinematic.vue';

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

const showCinematique = ref("")
function toggleCinematique() {
    if (showCinematique.value == '') {
        showCinematique.value = props.transformer.name
    } else {
        showCinematique.value = ''
    }
}

const showQuit = ref(false)
function toggleQuit() {
    showQuit.value = !showQuit.value
}

</script>

<template>
    <div class="background" @click="$emit('resumeGame')"></div>
    <div class="pause-container" v-if="!showQuit">
        <h3 class="close-x" @click="$emit('resumeGame')">X</h3>
        <div class="pause-details-container">
            <h2 class="title">PAUSE</h2>
            <img class="pause-deco" src="/assets/icons/rules-deco.svg">
            <div class="content">
                <ButtonComponent class="menu-option" @click="$emit('resumeGame')">Reprendre</ButtonComponent>
                <ButtonComponent class="menu-option" @click="toggleRules()">Règles</ButtonComponent>
                <ButtonComponent class="menu-option" @click="toggleCinematique()">Cinématique</ButtonComponent>
                <ButtonComponent class="menu-option" @click="toggleQuit()">Quitter</ButtonComponent>
            </div>
        </div>
    </div>

    <popupRules v-if="showRules" :transformer="props.transformer" :gameLaunched="true" @emitToggleRules="toggleRules()"
        @emitPlay="$emit('resumeGame')" @emitBackToGame="$emit('resumeGame')"></popupRules>
    <cinematic v-if="showCinematique != ''" :transformer="showCinematique" @emitPlay="toggleCinematique()">
    </cinematic>
    <popupQuit v-if="showQuit" @emitToggleQuit="toggleQuit()"></popupQuit>
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
    width: 1000px;
    height: 600px;
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
    padding-bottom: 2px;
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
        width: 600px;
        height: 320px;
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