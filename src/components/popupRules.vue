<script setup>
import { transform } from '@vue/compiler-core';


const props = defineProps({
    transformer: Object
})

const emit = defineEmits([
    'emitToggleRules',
]);

</script>

<template>
    <div class="background" @click="$emit('emitToggleRules')"></div>
    <div class="container">
        <h3 class="close-x" @click="$emit('emitToggleRules')">X</h3>
        <div class="rules-full-container">
            <h2>{{ props.transformer.name }}</h2>
            <img class="pause-deco" src="src/assets/icons/rules-deco.svg">
            <div class="rules-container">
                <h3>Règles</h3>
                <p class="rules-p">{{ props.transformer.description }}</p>
                <div class="ressources-container">
                    <div class="ressources-details">
                        <p>Ressources nécessaires</p>
                        <div class="ressources-progression">

                        </div>
                    </div>
                    <div class="ressources-details">
                        <p>Ressources reçues</p>
                        <div class="ressources-progression">

                        </div>
                    </div>
                    <div class="ressources-details">
                        <p>Conséquences</p>
                        <div class="ressources-progression">

                        </div>
                        <div class="ressources-progression">

                        </div>
                    </div>
                </div>
            </div>
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
}

.close-x {
    cursor: pointer;
    position: absolute;
    left: 100%;
    transform: translate(-100%, 0);
    line-height: 1;
    padding: 30px;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 600px;
    background-color: #FBF8F1;
    text-align: center;
}
.rules-full-container{
    padding: 50px;
    height: 500px;
}

.rules-container {
    text-align: left;
    padding-left: 50px;
    padding-right: 50px;
}
.pause-deco {
    width: 100%;
}

.ressources-container {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}
.rules-p {
    font-size: 1em;
}

.ressources-details {
    display: flex;
    flex-direction: column;
}
.ressources-details p {
    font-size: 1.3em;
    font-weight: bold;
}
</style>