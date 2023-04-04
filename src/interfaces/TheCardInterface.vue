<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faArrowLeft, faUserSecret } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
import Card from '../components/card.vue';
import popupCardEnd from '../components/popupCardEnd.vue';
import ressource from '../components/ressource.vue';
import dataCards from '../assets/dataCards.json';
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

console.log(dataCards.cards[0].id)

// let CARDS = [];
// create a new array with 5 of the dataCards objects
// for(let i = 0; i < dataCards.cards.length; i++) {
//   CARDS.push(dataCards.cards[i])
//   dataCards.cards[i].id = i
// }

let CARDS = ref([
  { 
    name: 'Card 1', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',  
    ressources: [{name: 'energy', level: 10}, {name: 'water', level: 30}, {name: 'hunger', level: 50}],
    description: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    response: '',
    yes: 'Card 1 yes info',
    no: 'Card 1 no info'
  },
  { 
    name: 'Card 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
    ressources: [{name: 'energy', level: 10}, {name: 'water', level: 30}, {name: 'hunger', level: 50}],
    description: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    response: '',
    yes: 'Card 2 yes info',
    no: 'Card 2 no info'
  },
  { 
    name: 'Card 3', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
    ressources: [{name: 'peaceJustice', level: 90}, {name: 'water', level: 30}, {name: 'hunger', level: 50}],
    description: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    response: '',
    yes: 'Card 3 yes info',
    no: 'Card 3 no info'
  }
])

const iCurrentCard = CARDS.value.length-1;
let mouseMoveHandler;
onMounted(() => {
  const windowCenterX = window.innerWidth / 2;
  
  mouseMoveHandler = (event) => {
    const card = document.querySelector(`#card-${iCurrentCard}`);
    const band = card.querySelector(`.flip-card-band`);
    if (!card) return;
    
    // If the person tilts on the left, we'll show the "no" response
    if (event.clientX < windowCenterX - 200) {
      CARDS.value[iCurrentCard].response = CARDS.value[iCurrentCard].no;
      band.style.height = '20%';
    } else if(event.clientX > windowCenterX + 200){
      CARDS.value[iCurrentCard].response = CARDS.value[iCurrentCard].yes;
      band.style.height = '20%';
    } else {
      band.style.height = '0%';
    }
    const tiltRange = 7; // You can adjust the tilt range as needed
    const tilt = (event.clientX - windowCenterX) / windowCenterX * tiltRange;
    card.style.transform = `rotate(${tilt}deg) translate(-50%, calc(-50% + ${15 * iCurrentCard}px))`;
  };
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("click", (event) => {
    if (event.clientX < windowCenterX - 200) {
      console.log('no')
    } else if(event.clientX > windowCenterX + 200){
      console.log('yes')
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("mousemove", mouseMoveHandler);
});

function testAnim(){ //Test for the level diffence
  RESSOURCES_NAMES.value.forEach(ressource => {
    ressource.level = Math.floor(Math.random() * 100);
  })
}
function turnCard() {
  // if (iNextCard >= 0) {
  //   anime({
  //     targets: '.flip-card .flip-card-inner',
  //     keyframes: [
  //       { translateY: ['500', '0'] },
  //       { rotateY: 180 }
  //     ],
  //     duration: 1000,
  //     delay: anime.stagger(500),
  //     easing: 'spring(1, 80, 10, 0)'
  //   });
  //   iNextCard--;
  // }
}

</script>


<template>
    <div class="main-page">
      <p to="/" class="back-link"><font-awesome-icon icon="fa-solid fa-arrow-left" />  Retour au campement</p>
      <div class="bottom-text">La forêt</div>
      <!-- <div id="ressources">
        <ressource v-for="name of RESSOURCES_NAMES" :name="name.name" :level="name.level" size="60px"></ressource>
      </div> -->
      

      <div id="cards">
        <Card v-for="(card, index) of CARDS" :name="card.name" 
        :description="card.description" 
        @click="turnCard()" 
        :index="index" 
        ref="cards"
        :ressources="card.ressources"
        :response="card.response"
        ></Card>
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
  