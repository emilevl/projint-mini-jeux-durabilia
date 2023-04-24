<script setup>
import { ref } from 'vue';
import { ressourceGlobal } from '../utils/store';
import RessourceComponent from './RessourceComponent.vue';
import ButtonComponent from './ButtonComponent.vue';


const props = defineProps({
    transformer: Object,
    gameLaunched: Boolean
})

const emit = defineEmits([
    'emitToggleRules',
    'emitPlay'
]);

//MOBILE VERSION
//////////////////////////////// To detect if the user is on small screen of not (less than 800px)
const mobileInterface = ref(false)
if (window.innerWidth < 1050) {
    mobileInterface.value = true
} else {
    mobileInterface.value = false
}
//For mobile, know which section to show (rules or ressources)
const showFirstSection = ref(true)
function toggleSectionMobile() {
    showFirstSection.value = !showFirstSection.value
}

</script>

<template>
    <div v-if="!props.gameLaunched" class="background" @click="$emit('resumeGame')"></div>
    <!-- Desktop interface -->
    <div v-if="!mobileInterface" class="container">
        <h3 v-if="props.gameLaunched" class="close-x" @click="$emit('emitToggleRules')">X</h3>
        <div v-if="props.gameLaunched" class="back-button" @click="$emit('emitToggleRules')">
            <div class="back-arrow">
                <div class="bar-1"></div>
                <div class="bar-2"></div>
            </div>
            <p class="back-text">Retour</p>
        </div>
        <div class="rules-full-container">
            <h2 class="title">{{ props.transformer.name }}</h2>
            <p class="type-game">{{ props.transformer.type }}</p>
            <img class="pause-deco" src="/assets/icons/rules-deco.svg">
            <div class="rules-container">
                <h3 class="subtitle">Règles</h3>
                <p class="rules-p">{{ props.transformer.description }}</p>
                <div class="ressources-container">
                    <div class="ressources-details">
                        <p class="ressources-type">Ressources nécessaires</p>
                        <RessourceComponent class="ressource" :img="props.transformer.ressourceNecessaire.img"
                            :impactLevel="props.transformer.ressourceNecessaire.level" :ressourceSize="100">
                        </RessourceComponent>
                    </div>
                    <div class="ressources-details">
                        <p class="ressources-type">Ressources reçues</p>
                        <RessourceComponent class="ressource" :img="props.transformer.ressourceRecue.img"
                            :impactLevel="props.transformer.ressourceRecue.level" :ressourceSize="100"></RessourceComponent>
                    </div>
                    <div class="ressources-details">
                        <p class="ressources-type">Conséquences</p>
                        <RessourceComponent class="ressource" :img="props.transformer.consequence.img"
                            :impactLevel="props.transformer.consequence.level[0]" :ressourceSize="100"></RessourceComponent>
                    </div>
                </div>
            </div>
            <ButtonComponent v-if="!props.gameLaunched" class="play-button" @click="$emit('emitPlay')">Jouer
            </ButtonComponent>
        </div>
    </div>

    <!-- Mobile interface -->
    <div v-if="mobileInterface" class="container">
        <h3 class="close-x" @click="$emit('emitToggleRules')">X</h3>
        <div v-if="props.gameLaunched" class="back-button" @click="$emit('emitToggleRules')">
            <div class="back-arrow">
                <div class="bar-1"></div>
                <div class="bar-2"></div>
            </div>
            <p class="back-text">Retour</p>
        </div>
        <div class="rules-full-container">
            <h2 class="title">{{ props.transformer.name }}</h2>
            <p class="type-game">{{ props.transformer.type }}</p>
            <img class="pause-deco" src="/assets/icons/rules-deco.svg">
            <div v-if="showFirstSection" class="section-1">
                <div class="rules-container">
                    <div v-if="props.gameLaunched" class="next-section-button" @click="toggleSectionMobile()">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <div v-if="props.gameLaunched" class="previous-section-button disabled">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <h3 class="subtitle">Règles</h3>
                    <p class="rules-p">{{ props.transformer.description }}</p>
                </div>
                <ButtonComponent v-if="!props.gameLaunched" class="play-button" @click="toggleSectionMobile()">Suivant
                </ButtonComponent>
            </div>
            <div v-if="!showFirstSection" class="section-2">
                <div class="rules-container">
                    <div v-if="props.gameLaunched" class="next-section-button disabled">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <div v-if="props.gameLaunched" class="previous-section-button" @click="toggleSectionMobile()">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>
                    <div class="ressources-container">
                        <div class="ressources-details">
                            <p class="ressources-type">Ressources nécessaires</p>
                            <RessourceComponent class="ressource" :img="props.transformer.ressourceNecessaire.img"
                                :impactLevel="props.transformer.ressourceNecessaire.level" :ressourceSize="75">
                            </RessourceComponent>
                        </div>
                        <div class="ressources-details">
                            <p class="ressources-type">Ressources reçues</p>
                            <RessourceComponent class="ressource" :img="props.transformer.ressourceRecue.img"
                                :impactLevel="props.transformer.ressourceRecue.level" :ressourceSize="75">
                            </RessourceComponent>
                        </div>
                        <div class="ressources-details">
                            <p class="ressources-type">Conséquences</p>
                            <RessourceComponent class="ressource" :img="props.transformer.consequence.img"
                                :impactLevel="props.transformer.consequence.level[0]" :ressourceSize="75">
                            </RessourceComponent>
                        </div>
                    </div>
                </div>
                <ButtonComponent v-if="!props.gameLaunched" class="play-button" @click="$emit('emitPlay')">Jouer
                </ButtonComponent>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* /////////////////////////////////////////////////////// DESKTOP */
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

.back-button {
    cursor: pointer;
    position: absolute;
    left: 0;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 30px;
}

.back-text {
    font-size: 1em;
}

.back-arrow {
    transform: rotateY(180deg);
}

.container {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 600px;
    background-color: #FBF8F1;
    text-align: center;
}

.rules-full-container {
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
    justify-content: space-around;
}

.rules-p,
.type-game,
.ressources-name,
.ressources-impact,
.ressources-impact-special {
    font-size: 1em;
}

.ressources-details {
    display: flex;
    flex-direction: column;
    width: 30%;
}

.play-button {
    margin-top: 30px;
}

.ressource {
    margin-top: 15px;
    text-align: center;
}

/* /////////////////////////////////////////////////////// MOBILE */

.bar-1,
.bar-2 {
    background-color: black;
    height: 3px;
    width: 15px;
}

.bar-1 {
    transform: rotate(45deg) translate(0px, -4px);
}

.bar-2 {
    transform: rotate(-45deg) translate(0px, 4px);
}

.next-section-button {
    height: 25px;
    width: 25px;
    position: absolute;
    left: 50%;
    bottom: 25px;
    transform: translate(25px, 0);
}

.previous-section-button {
    height: 25px;
    width: 25px;
    position: absolute;
    right: 50%;
    bottom: 25px;
    transform: rotateY(180deg);
    transform: translate(-25px, 0) rotateY(180deg);
}

.disabled {
    opacity: 20%;
}

@media screen and (max-width: 1050px) {
    .close-x {
        padding: 25px;
        font-size: 1.5em;
    }

    .back-button {
        gap: 10px;
        padding: 25px;
    }

    .back-text {
        font-size: 0.8em;
    }

    .container {
        width: 600px;
        height: 350px;
    }

    .rules-full-container {
        padding: 25px;
        height: 300px;
    }

    .title {
        font-size: 1.5em;
    }

    .subtitle {
        font-size: 1.2em;
        padding-top: 10px;
    }

    .rules-p,
    .type-game {
        font-size: 0.8em;
    }

    .play-button {
        font-size: 0.8em;
        background-color: black;
        color: #FBF8F1;
        border-radius: 10px 0px;
        width: 70px;
        height: 30px;
        margin: 0;
        position: absolute;
        transform: translate(-50%, 0);
        margin-bottom: 25px;
        bottom: 0;
    }

    .ressources-type {
        font-size: 0.8em;
        font-weight: 700;
    }
}
</style>