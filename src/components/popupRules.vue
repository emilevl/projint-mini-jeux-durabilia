<script setup>
import { ref } from 'vue';
import { ressourceGlobal } from '../utils/store';


const props = defineProps({
    transformer: Object
})

const emit = defineEmits([
    'emitToggleRules',
]);

/////////////////////////// Manage the level progression of the ressource bars
const ressourceNecessaireLevel = ref("")
const ressourceNecessaireImpact = ref(`${Math.abs(props.transformer.ressourceNecessaire.level)/100*200}px`)
const ressourceNecessaireColor = ref("green")
const ressourceRecueLevel = ref("")
const ressourceRecueImpact = ref(`${Math.abs(props.transformer.ressourceRecue.level)/100*200}px`)
const ressourceRecueColor = ref("green")
function getLevelProgression() {
    let necessaireTemp = 0
    let recueTemp = 0
    ressourceGlobal.value.forEach(ressource => {
        if (ressource.name == props.transformer.ressourceNecessaire.name) necessaireTemp = ressource.currentLevel
        if (ressource.name == props.transformer.ressourceRecue.name) recueTemp = ressource.currentLevel
    })
    // Diminuer la taille de la bar noir si le niveau d'impact est négatif
    if(props.transformer.ressourceNecessaire.level < 0){
        necessaireTemp += props.transformer.ressourceNecessaire.level
        ressourceNecessaireColor.value = "red"
    }
    if(props.transformer.ressourceRecue.level < 0){
        ressourceRecueColor.value = "red"
    } 
    ressourceNecessaireLevel.value = `${(necessaireTemp / 100) * 200}px`
    ressourceRecueLevel.value = `${(recueTemp / 100) * 200}px`
}
getLevelProgression()

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
                        <p class="ressources-type">Ressources nécessaires</p>
                        <div class="ressources-progression">
                            <div class="ressources-info">
                                <img class="ressources-icon"
                                    :src="`src/assets/icons/${props.transformer.ressourceNecessaire.name}.svg`">
                                <p class="ressources-name">{{ props.transformer.ressourceNecessaire.name }}</p>
                            </div>
                            <div class="progression-bar-container">
                                <div class="progression-bar-current" id="bar-necessaire-level"></div>
                                <div class="progression-bar-impact" id="bar-necessaire-impact"></div>
                            </div>
                            <p v-if="parseInt(props.transformer.ressourceNecessaire.level) < 0" class="ressources-impact">{{ props.transformer.ressourceNecessaire.level }}</p>
                            <p v-if="parseInt(props.transformer.ressourceNecessaire.level) > 0" class="ressources-impact">+{{ props.transformer.ressourceNecessaire.level }}</p>
                        </div>
                    </div>
                    <div class="ressources-details">
                        <p class="ressources-type">Ressources reçues</p>
                        <div class="ressources-progression">
                            <div class="ressources-info">
                                <img class="ressources-icon"
                                    :src="`src/assets/icons/${props.transformer.ressourceRecue.name}.svg`">
                                <p class="ressources-name">{{ props.transformer.ressourceRecue.name }}</p>
                            </div>
                            <div class="progression-bar-container">
                                <div class="progression-bar-current" id="bar-recue-level"></div>
                                <div class="progression-bar-impact" id="bar-recue-impact"></div>
                            </div>
                            <p v-if="parseInt(props.transformer.ressourceRecue.level) < 0" class="ressources-impact">{{ props.transformer.ressourceRecue.level }}</p>
                            <p v-if="parseInt(props.transformer.ressourceRecue.level) > 0" class="ressources-impact">+{{ props.transformer.ressourceRecue.level }}</p>
                        </div>
                    </div>
                    <div class="ressources-details">
                        <p class="ressources-type">Conséquences</p>
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
    justify-content: space-between;
}

.rules-p,
.ressources-name,
.ressources-impact {
    font-size: 1em;
}

.ressources-details {
    display: flex;
    flex-direction: column;
}

/* --------------------------------- Ressources Progression ------------------------------------------------ */
.ressources-type {
    font-size: 1.3em;
    font-weight: bold;
}

.ressources-progression {
    display: flex;
    flex-direction: column;
    width: 200px;
}

.ressources-info {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    margin-top: 10px;
}

.ressources-icon {
    height: 24px;
}
.ressources-impact {
    margin: 0;
    display: block;
    align-self: flex-end;
}

/* ----------- BAR PROGRESSION --------------- */
.progression-bar-container {
    margin-top: 10px;
    width: 200px;
    height: 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: start;
}

.progression-bar-current {
    background-color: black;
}

#bar-necessaire-level {
    width: v-bind(ressourceNecessaireLevel);
}
#bar-necessaire-impact {
    width: v-bind(ressourceNecessaireImpact);
    background-color: v-bind(ressourceNecessaireColor);
}

#bar-recue-level {
    width: v-bind(ressourceRecueLevel);
}
#bar-recue-impact {
    width: v-bind(ressourceRecueImpact);
    background-color: v-bind(ressourceRecueColor);
}
</style>