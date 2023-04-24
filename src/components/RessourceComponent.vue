<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { ressourceGlobal } from '../utils/store';

const props = defineProps({
    img: String,
    impactLevel: Number,
    ressourceSize: Number,
    ressourceReset: Boolean
})
const sizeCSS = ref(`${props.ressourceSize}px`)

//Get the name of the ressource from the prop img and the currentLevel
const name = ref("")
const currentLevel = ref(0)
const color = ref("")

ressourceGlobal.value.forEach(ressource => {
    if (ressource.img == props.img) {
        name.value = ressource.name
        currentLevel.value = ressource.currentLevel
        color.value = ressource.color
    }
})

const principHeight = ref("0px")
const impactHeight = ref("0px")
const impactLevelTemp = ref(0)

setTimeout(() => setCurrentLevel(), 10)
setTimeout(() => setImpactLevel(), 300)

const transitionImpact = ref("all 1s ease 0s")
const transitionPrincip = ref("all 0s ease 0s")
watchEffect(() => {
    if (props.ressourceReset) {
        transitionImpact.value = "all 0s ease 0s"
        impactHeight.value = "0px"
        setTimeout(() => setCurrentLevel(), 10)
        setTimeout(() => setImpactLevel(), 300)
    }
});

////////////////Transpose the % of the impact into pixels
function setCurrentLevel() {
    transitionPrincip.value = "all 0s ease 0s"
    principHeight.value = `${(Math.abs(currentLevel.value) / 100) * props.ressourceSize}px`
}

function setImpactLevel() {
    impactLevelTemp.value = props.impactLevel
    transitionImpact.value = "all 1s ease 0s"
    //Manage the case where we pass the bar limit (0 - 100)
    if (props.impactLevel + currentLevel.value >= 100) {
        impactLevelTemp.value = 100 - currentLevel.value
    } else if (props.impactLevel + currentLevel.value <= 0) {
        impactLevelTemp.value = - currentLevel.value
    }

    impactHeight.value = `${(Math.abs(impactLevelTemp.value) / 100) * props.ressourceSize}px`
    //Manage the negative impact
    if (props.impactLevel < 0) {
        transitionPrincip.value = "all 1s ease 0s"
        principHeight.value = `${parseInt(principHeight.value) - ((Math.abs(impactLevelTemp.value) / 100) * props.ressourceSize)}px` //Diminish the principal bar
    }
}

</script>

<template>
    <div class="detail-progression">
        <div class="progression-bar-container">
            <div class="progression-bar-current" :id="`barGlob-${props.img}`"></div>
            <div class="progression-bar-impact" :id="`${props.img}`"></div>
        </div>
        <div class="icon-container">
            <p class="progression-bar-title">{{ name }}</p>
            <img class="icon" :src="`/assets/icons/${props.img}.svg`">
            <p v-if="impactLevelTemp > 0" class="progression-bar-number">+{{ impactLevelTemp }}</p>
            <p v-if="impactLevelTemp < 0" class="progression-bar-number">{{ impactLevelTemp }}</p>
            <p v-if="impactLevelTemp == 0" class="progression-bar-number">-</p>
        </div>
    </div>
</template>

<style scoped>
.icon {
    height: 30px;
    z-index: 10;
    filter: brightness(0) invert(1);
}

.icon-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    height: v-bind(sizeCSS);
    width: v-bind(sizeCSS);
}

.detail-progression {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.progression-bar-container {
    height: v-bind(sizeCSS);
    width: v-bind(sizeCSS);
    background-color: #282828;
    border: 1px solid black;
    display: flex;
    flex-direction: column-reverse;
    justify-content: end;
}

.progression-bar-current {
    background-color: v-bind(color);
    height: v-bind(principHeight);
    transition: v-bind(transitionPrincip);
}

.progression-bar-impact {
    opacity: 0.5;
    background-color: v-bind(color);
    height: v-bind(impactHeight);
    transition: v-bind(transitionImpact);
}

.progression-bar-number,
.progression-bar-title {
    font-size: 0.9rem;
    color: white;
}
</style>