<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: String,
    level: Number,
    size: String
})
const url = `src/assets/icons/${props.name}.svg`
let percentToPX = (parseInt(props.level) / 100) * parseInt(props.size)
let sizeLevel = ref(`${percentToPX}px`) //Taille de remplissage de l'icon de la ressource
let translate = ref(`${parseInt(props.size) - percentToPX}px`) //Remplissage commençant du bas
</script>

<template>
    <div id="container">
        <div class="back icon">
            <img :src=url>
        </div>
        <div class="front icon">
            <img :src=url>
        </div>
    </div>
</template>

<style scoped>
#container {
    display: grid;
    grid-template: 1fr / 1fr;
}
img {
    height: v-bind(size);
}
.icon {
    overflow: hidden;
    height: v-bind(size);
    width: v-bind(size);
    grid-column: 1 / 1;
    grid-row: 1 / 1;
}
.front {
    height: v-bind(sizeLevel);
    align-self: end;
}
.front > img {
    position: relative;
    bottom: v-bind(translate);
}
.back {
    opacity: 30%;
}
</style>