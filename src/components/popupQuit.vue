<script setup>
import ButtonComponent from './ButtonComponent.vue';
function leaveGame() {
    window.location.hash = ""
}
</script>

<template>
    <div class="background"></div>
    <div class="pause-container">
        <div class="pause-details-container">
            <h2 class="title">QUITTER</h2>
            <img class="pause-deco" src="/assets/icons/pause-deco.svg">
            <div class="content">
                <ButtonComponent @click="$emit('emitToggleQuit')">Annuler</ButtonComponent>
                <ButtonComponent @click="leaveGame">Oui</ButtonComponent>
            </div>
        </div>
    </div>
</template>

<style scoped>

.pause-container {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(400px, 40vw, 800px);
    background-color: #FBF8F1;
}

.pause-details-container {
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pause-deco {
    width: 100%;
}

.content {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    font-size: 1.5rem;
}

.title {
    margin: 0;
    padding: 20px;
    text-align: center;
}

@media screen and (max-width: 800px) {
    /* .pause-container {
        width: 300px;
        height: 300px;
    } */

    .pause-details-container {
        padding: 25px;
        height: 250px;
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
    /* .pause-container {
        width: 300px;
        height: 300px;
    } */

    .pause-details-container {
        padding: 25px;
        height: 250px;
    }

    .title {
        font-size: 1.5em;
        padding: 10px;
    }

    .content {
        font-size: 1rem
    }
}
</style>