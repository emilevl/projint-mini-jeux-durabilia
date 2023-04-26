<script setup>
import { onMounted, ref, computed } from 'vue';
import { ressourceGlobal } from '../../utils/store';
import popupRules from "../../components/popupRules.vue"
import ButtonComponent from './../ButtonComponent.vue';
import RessourceComponent from './../RessourceComponent.vue';
// src/assets/sounds/Trumpet_Win.wav

const props = defineProps({
    transformer: Object,
    win: Boolean
})

function leaveGame() {
    window.location.hash = ""
}

const showRules = ref(false)
function toggleRules() {
    showRules.value = !showRules.value

}

const resourceReceived = computed(() => {
    return props.win ? 
        props.transformer.ressourceRecue.level :
        Math.floor(props.transformer.ressourceRecue.level/2)
})

const consequence = computed(() => {
    return props.win ? 
        props.transformer.consequence.level[0] :
        Math.floor(props.transformer.consequence.level[0]/2)
})

const resultSubtitle = computed(() => {
    return props.win ?
        'Vous avez gagné !' :
        'Vous avez perdu !'
})
</script>

<template>
    <div class="background"></div>
    <div class="container">
        <div class="rules-full-container">
            <h2 class="title">{{ resultSubtitle }}</h2>
            <img class="pause-deco" src="/assets/icons/rules-deco.svg">
            <div class="rules-container">
                <h3 class="subtitle">Ressources impactées</h3>
                <div class="ressources-container">
                    <div class="ressources-details">
                        <RessourceComponent class="ressource" :img="props.transformer.ressourceNecessaire.img"
                            :impactLevel="props.transformer.ressourceNecessaire.level" :ressourceSize="100">
                        </RessourceComponent>
                    </div>
                    <div class="ressources-details">
                        <RessourceComponent class="ressource" :img="props.transformer.ressourceRecue.img"
                            :impactLevel="resourceReceived" :ressourceSize="100"></RessourceComponent>
                    </div>
                    <div class="ressources-details">
                        <RessourceComponent class="ressource" :img="props.transformer.consequence.img"
                            :impactLevel="consequence" :ressourceSize="100"></RessourceComponent>
                    </div>
                </div>
            </div>
            <ButtonComponent 
                @click="leaveGame"
                class="back-map"
            >Retour à la map</ButtonComponent>
        </div>
    </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    height: 500px;
}

.rules-container {
    text-align: left;
    padding-left: 50px;
    padding-right: 50px;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.pause-deco {
    width: 100%;
    padding-top: 20px;
}

.ressources-container {
    display: flex;
    justify-content: space-around;
    gap: 50px;
}

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

.ressource {
    text-align: center;
}

.subtitle {
    font-size: 1.2em;
    padding-bottom: 40px;
}

@media screen and (max-width: 1050px) {

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
        font-size: 0.8em;
        padding-bottom: 20px;
    }

    .ressources-container {
        gap: 30px;
    }

    .pause-deco {
        padding-top: 10px;
    }
}
</style>