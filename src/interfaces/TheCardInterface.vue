<script setup>
import { ref } from 'vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faArrowLeft, faUserSecret } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
import Card from '../components/card.vue';
import ressource from '../components/ressource.vue';
library.add(faArrowLeft)


//Les noms et les niveaux pour chaque ressources (Les niveaux sont en pourcents)
let RESSOURCES_NAMES = ref([
  { name: 'climateActions', level: 0 },
  { name: 'communities', level: 0 },
  { name: 'consumption', level: 0 },
  { name: 'decentWork', level: 0 },
  { name: 'education', level: 0 },
  { name: 'energy', level: 0 },
  { name: 'genderEquality', level: 0 },
  { name: 'health', level: 0 },
  { name: 'hunger', level: 0 },
  { name: 'inequality', level: 0 },
  { name: 'innovation', level: 0 },
  { name: 'lifeAquatic', level: 0 },
  { name: 'lifeLand', level: 0 },
  { name: 'partnership', level: 0 },
  { name: 'peaceJustice', level: 0 },
  { name: 'poverty', level: 0 },
  { name: 'water', level: 0 },
])

let CARDS = ref([
  { name: 'Card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Card 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
])

function testAnim(){ //Test for the level diffence
  RESSOURCES_NAMES.value.forEach(ressource => {
    ressource.level = Math.floor(Math.random() * 100);
  })
}

</script>


<template>
    <div class="main-page">
      <p to="/" class="back-link"><font-awesome-icon icon="fa-solid fa-arrow-left" />  Retour au campement</p>
      <div class="bottom-text">La forêt</div>
      <div id="ressources">
        <ressource v-for="name of RESSOURCES_NAMES" :name="name.name" :level="name.level" size="60px"></ressource>
      </div>
      

      <div id="cards">
        <Card v-for="card of CARDS" :name="card.name" :description="card.description" @click="testAnim()" :index="card.index"></Card>
      </div>
    </div>
  </template>
  
  <style>
  body {
    background-color: #b8b7b7;
    
  }
    .main-page {
      display: flex;
      justify-content: center;
    }
    
    .back-link {
        position: absolute;
        top: 0;
        left: 0;
        margin: 20px;
        cursor: pointer;
    }
    
    .bottom-text {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 20px;
    }
    /* #cards {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: normal;
      align-items: normal;
      align-content: normal;
      gap: 32px;
    } */

    #ressources {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 15px;
      position: absolute;
      top: 10px;
      margin: 0 auto;
    }
  </style>
  