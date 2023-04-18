<script setup>
import { onMounted, ref } from 'vue';
import { ressourceGlobal } from '../utils/store';
import popupRules from "../components/popupRules.vue"

const props = defineProps({
    transformer: Object
})

const emit = defineEmits([
    'resumeGame',
]);

function leaveGame() {
    // ask for confirmation
    if (confirm('Voulez-vous vraiment quitter la partie ?', 'Oui', 'Non')) {
        // reset the ressourceGlobal
        // redirect to the home page
        console.log('redirect to the map')
    }
}

const showRules = ref(false)
function toggleRules() {
    // show the rules
    console.log('show the rules')
    showRules.value = !showRules.value

}

</script>

<template>
    <div class="background" @click="$emit('resumeGame')"></div>
    <div class="pause-container">
        <h3 class="close-x" @click="$emit('resumeGame')">X</h3>
        <div class="pause-details-container">
            <h2 class="title">PAUSE</h2>
            <img class="pause-deco" src="src/assets/icons/pause-deco.svg">
            <div class="content">
                <ul>
                    <li @click="$emit('resumeGame')">Reprendre</li>
                    <li @click="toggleRules()">Règles</li>
                    <li @click="leaveGame()">Quitter</li>
                </ul>
            </div>
        </div>
    </div>
    <popupRules v-if="showRules" :transformer="props.transformer" :gameLaunched="false" @emitToggleRules="toggleRules()"
        @emitPlay="$emit('resumeGame')"></popupRules>
</template>

<style scoped>
.background {
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
}

.content ul {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
}

.pause-container .title {
    margin: 0;
    padding: 20px;
    text-align: center;
}

.pause-container .content ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: 'Urbanist', 'Inter', sans-serif;
    font-size: 2rem;
    /* remove the padding of the li */
}

.pause-container .content ul li {
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.3s;
}

.pause-container .content ul li:hover {
    background-color: black;
    color: #FBF8F1;
    border-radius: 20px 0px;
    transition: 0.3s;
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
    }

    .pause-container .content ul {
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
    }

    .pause-container .content ul {
        font-size: 1rem
    }
}
</style>