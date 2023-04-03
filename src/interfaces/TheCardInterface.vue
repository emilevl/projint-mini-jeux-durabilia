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
import ressource from '../components/ressource.vue';
library.add(faArrowLeft)


//Les noms et les niveaux pour chaque ressources (Les niveaux sont en pourcents)
let RESSOURCES_NAMES = ref([
  { name: 'balance', level: 40 },
  { name: 'bolt', level: 20 },
  { name: 'brain', level: 80 },
  { name: 'bulb', level: 75 },
  { name: 'engagement', level: 33 },
  { name: 'handshake', level: 29 },
  { name: 'network', level: 100 },
  { name: 'sober', level: 0 }
])

let CARDS = ref([
  { name: 'Card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Card 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
])

let mouseMoveHandler;
onMounted(() => {
  let animationDone = false;

  // Wait for the initial animation to complete
  setTimeout(() => {
    animationDone = true;
  }, 1000 + 500 * CARDS.value.length);

  mouseMoveHandler = (event) => {
    const windowCenterX = window.innerWidth / 2;
    const card = document.querySelector("#cards .flip-card:first-child");
    if (!card) return;

    const cardComponent = ctx.$refs.cards[0];
    if (!cardComponent) return;

    // Get the translateY and scale values from the Vue component's style attribute
    const translateY = cardComponent.$attrs.style.match(/translateY\(([^)]+)\)/)[1];
    const scale = cardComponent.$attrs.style.match(/scale\(([^)]+)\)/)[1];

    const tiltRange = 5; // You can adjust the tilt range as needed
    const tilt = (event.clientX - windowCenterX) / windowCenterX * tiltRange;
    card.style.transform = `rotate(${tilt}deg)`;
  };
  document.addEventListener("mousemove", mouseMoveHandler);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", mouseMoveHandler);
});

function testAnim(){ //Test for the level diffence
  RESSOURCES_NAMES.value.forEach(ressource => {
    ressource.level = Math.floor(Math.random() * 100);
  })
}
const iNextCard = CARDS.value.length-1;
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
      <div id="ressources">
        <ressource v-for="name of RESSOURCES_NAMES" :name="name.name" :level="name.level" size="60px"></ressource>
      </div>
      

      <div id="cards">
        <Card v-for="(card, index) of CARDS" :name="card.name" 
        :description="card.description" 
        @click="turnCard()" 
        :index="index" ref="cards" 
        :style="{
          position: 'absolute', 
          top: `${50+ index}%`, 
          left: '50%'
          }"></Card>
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
  