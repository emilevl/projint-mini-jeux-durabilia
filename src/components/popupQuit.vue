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
            <img class="pause-deco" src="/assets/icons/rules-deco.svg">
            <div class="content">
                <p class="warning">Souhaites-tu vraiment quitter ? Ta partie sera abandonnée et tes ressources utilisées...</p>
                <div class="btn-group">
                    <ButtonComponent class="menu-option" @click="$emit('emitToggleQuit')">Annuler</ButtonComponent>
                    <ButtonComponent class="yes-btn" @click="leaveGame">Oui</ButtonComponent>
                </div>
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
    width: 1000px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
}

.warning {
    padding: 20px 0;
}
.btn-group {
    display: flex;
    gap: 40px;
}

.title {
    margin: 0;
    padding: 0 20px 20px 20px;
    text-align: center;
}

@media screen and (max-width: 1050px) {

    .pause-container {
        width: 600px;
    }

    .pause-details-container {
        padding: 25px;
    }

    .title {
        font-size: 1.5em;
    }

    .content {
        font-size: 1rem;
    }

    .warning {
        font-size: 0.8rem;
    }

    .menu-option {
        background-color: unset;
        color: unset;
    }

    .yes-btn {
        border-radius: 10px 0px;
    }

    .yes-btn:hover {
        border-radius: 20px 0px;

    }

}
</style>