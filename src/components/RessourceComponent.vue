<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { ressourceGlobal } from '../utils/store';
import { hexToHSL } from '../utils/hexToHSL'

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
const colorImpact = ref("")
const impactOpacity = ref(1)

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
const heightWave = ref("0px")
const heightWaveImpact = ref("0px")

setTimeout(() => setCurrentLevel(), 10)
setTimeout(() => setColorImpact(), 10)
setTimeout(() => setImpactLevel(), 300)

const transitionImpact = ref("all 0s ease 0s")
const transitionPrincip = ref("all 0s ease 0s")
watchEffect(() => {
    if (props.ressourceReset) {
        transitionImpact.value = "all 0s ease 0s"
        impactHeight.value = "0px"
        heightWaveImpact.value = "0px"
        setTimeout(() => setCurrentLevel(), 10)
        setTimeout(() => setColorImpact(), 10)
        setTimeout(() => setImpactLevel(), 300)
    }
});

////////////////Transpose the % of the impact into pixels
function setCurrentLevel() {
    transitionPrincip.value = "all 0s ease 0s"
    principHeight.value = `${(Math.abs(currentLevel.value) / 100) * props.ressourceSize}px`
    if (currentLevel.value > 0 && currentLevel.value + props.impactLevel > 0) heightWave.value = "5px"
}

function setImpactLevel() {
    impactLevelTemp.value = props.impactLevel
    transitionImpact.value = "all 0.8s ease 0s"

    //Manage the case where we pass the bar limit (0 - 100)
    if (props.impactLevel + currentLevel.value >= 100) {
        impactLevelTemp.value = 100 - currentLevel.value
        heightWave.value = "1px"
        heightWaveImpact.value = "1px"
    } else if (props.impactLevel + currentLevel.value <= 0) {
        impactLevelTemp.value = - currentLevel.value
    }

    impactHeight.value = `${(Math.abs(impactLevelTemp.value) / 100) * props.ressourceSize}px`

    //Manage the negative impact
    if (props.impactLevel < 0) {
        transitionPrincip.value = "all 0.8s ease 0s"
        principHeight.value = `${parseInt(principHeight.value) - ((Math.abs(impactLevelTemp.value) / 100) * props.ressourceSize)}px` //Diminish the principal bar
    }

    if (parseInt(impactHeight.value) != 0 && heightWaveImpact.value != '1px') heightWaveImpact.value = '5px'
}

function setColorImpact() {
    if (props.impactLevel > 0) {
        impactOpacity.value = 1
        colorImpact.value = `${hexToHSL(color.value).split("%")[0]}%,70%)`
    } else {
        impactOpacity.value = 0.5
        colorImpact.value = color.value
    }
}

//Manage the waves for the progression bars
const d = ref(`M 0 -5 Q ${props.ressourceSize / 4} -10, ${props.ressourceSize / 2} -5 Q ${3 * props.ressourceSize / 4} 0, ${props.ressourceSize} -5  L ${props.ressourceSize} 5 L 0 5 Z`)

</script>

<template>
    <div class="detail-progression">
        <div class="progression-bar-container">
            <div class="progression-bar-current" :id="`barGlob-${props.img}`"></div>
            <svg class="progression-bar-current-svg">
                <path :d=d :fill=color />
            </svg>
            <div class="progression-bar-impact" :id="`${props.img}`"></div>
            <svg class="progression-bar-impact-svg">
                <path :d=d :fill=colorImpact :opacity=impactOpacity />
            </svg>
        </div>
        <div class="icon-container">
            <p class="progression-bar-title">{{ name }}</p>
            <img class="icon" :src="`/assets/icons/${props.img}.svg`">
            <p v-if="impactLevelTemp > 0" class="progression-bar-number">+{{ impactLevelTemp }}</p>
            <p v-if="impactLevelTemp < 0" class="progression-bar-number">{{ impactLevelTemp }}</p>
            <p v-if="impactLevelTemp == 0 && !(props.img == 'random')" class="progression-bar-number">-</p>
            <p v-if="props.img == 'random'" class="progression-bar-number">de -20 à +50</p>
        </div>
    </div>
</template>

<style scoped>
.icon {
    height: 30px;
    z-index: 4;
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
    overflow: hidden;
}

.progression-bar-current {
    background-color: v-bind(color);
    height: v-bind(principHeight);
    transition: v-bind(transitionPrincip);
    overflow: hidden;
}

.progression-bar-impact {
    opacity: v-bind(impactOpacity);
    background-color: v-bind(colorImpact);
    height: v-bind(impactHeight);
    transition: v-bind(transitionImpact);
    overflow: hidden;
}

.progression-bar-current-svg {
    height: v-bind(heightWave);
    overflow: visible;
}

.progression-bar-impact-svg {
    height: v-bind(heightWaveImpact);
    overflow: visible;
}

.progression-bar-number,
.progression-bar-title {
    font-size: 0.9rem;
    color: white;
}

@media screen and (max-width: 1050px) {

    .progression-bar-number,
    .progression-bar-title {
        font-size: 0.6rem;
    }

    .icon {
        height: 20px;
        z-index: 4;
        filter: brightness(0) invert(1);
    }
}
</style>