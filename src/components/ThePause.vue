<script setup>
import { onMounted, ref } from 'vue';
import { ressourceGlobal } from '../utils/store';

const props = defineProps({
    
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

function showRules() {
    // show the rules
    console.log('show the rules')
}

</script>

<template>
    <div class="background" @click="$emit('resumeGame')"></div>
    <div class="pause-container">
        <h2 class="title">Pause</h2>

        <div class="content">
            <ul>
                <li @click="$emit('resumeGame')">Reprendre</li>
                <li @click="showRules()">Règles</li>
                <li @click="leaveGame()">Quitter</li>
            </ul>
        </div>
    </div>
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

.pause-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    min-width: 300px;
    max-width: 400px;
    /* height: 600px; */
    background-color: white;
}

.pause-container .title {
    margin: 0;
    padding: 20px;
    font-size: 1.5rem;
    text-align: center;
}

.pause-container .content {
    
}

.pause-container .content ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 1.2rem;
    /* remove the padding of the li */
}

.pause-container .content ul li {
    padding: 10px 0;
    cursor: pointer;
    font-weight: bold;
}

.pause-container .content ul li:hover {
    background-color: #f2f2f2;
}
</style>