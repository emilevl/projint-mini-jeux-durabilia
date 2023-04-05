<script setup>
import { ref, onMounted, onUnmounted } from "vue";
/* add icons to the library */
import Card from "../components/card.vue";
import popupCardEnd from "../components/popupCardEnd.vue";
import ressource from "../components/ressource.vue";
import dataCards from "../assets/dataCards.json";
import anime from "animejs/lib/anime.es";
import { ressourceGlobal } from '../utils/store.js';
import ThePause from "../components/ThePause.vue";

//Les noms et les niveaux pour chaque ressources (Les niveaux sont en pourcents)
let RESSOURCES_NAMES = ref([
  { name: "climateActions", level: 0 },
  { name: "communities", level: 0 },
  { name: "consumption", level: 0 },
  { name: "decentWork", level: 0 },
  { name: "education", level: 0 },
  { name: "energy", level: 0 },
  { name: "genderEquality", level: 0 },
  { name: "health", level: 0 },
  { name: "hunger", level: 0 },
  { name: "inequality", level: 0 },
  { name: "innovation", level: 0 },
  { name: "lifeAquatic", level: 0 },
  { name: "lifeLand", level: 0 },
  { name: "partnership", level: 0 },
  { name: "peaceJustice", level: 0 },
  { name: "poverty", level: 0 },
  { name: "water", level: 0 },
]);

const CARDS = ref([]);
const TOTAL_CARDS = 5;
// choices are from the dataCards object: 0 = choice 1, 1 = choice -> cards.responses[choice]
const iChoice = ref(0);
let mouseMoveHandler;
let cardSelection = ref([]);
const endGame = ref(false);
const pauseGame = ref(false);


// create a new array with 5 of the dataCards objects
for (let i = 0; i < dataCards.cards.length; i++) {
  // add the card from the dataCards object to the CARDS array
  CARDS.value.push(dataCards.cards[i]);
  
  // dataCards.cards[i].id = i
}
const iCurrentCard = ref(CARDS.value.length - 1);


function decisionDone(decision) {

  // add the decision to the choice array
  const currentCard = CARDS.value[iCurrentCard.value];
  currentCard.decision = decision;
  cardSelection.value.push(currentCard);
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.querySelector("#clickable-part").removeEventListener("click", updateCardDecision);

  if (iCurrentCard.value === 0) {
    // end of the game
    endGame.value = true;
    return;
  }

  // animate the card to leave the page from the left or right, down
  console.log(iCurrentCard.value)
  const card = document.querySelector(`#card-${iCurrentCard.value} .flip-card-inner`);
  if (decision === 0) {
    // anime the card so it rotates fluently to the left bottom of the screen
    anime({
      targets: card,
      translateX: 700,
      translateY: 250,
      rotate: '90deg',
      opacity: [1, 0.7, 0.5, 0],
      duration: 250
    });

  } else {
    // anime the card so it rotates fluently to the right bottom of the screen
    anime({
      targets: card,
      translateX: -700,
      translateY: -250,
      rotate: '-90deg',
      opacity: [1, 0.7, 0.5, 0],
      duration: 250
    });
  }



  // wait for the animation to finish
  setTimeout(() => {
    // remove the card from the CARDS array
    iCurrentCard.value--;
    CARDS.value.pop();
    turnCard();
    
    document.addEventListener("mousemove", mouseMoveHandler);
    //select the #app element
    document.querySelector("#clickable-part").addEventListener("click", updateCardDecision);
  }, 250);

}



const windowCenterX = window.innerWidth / 2;
onMounted(() => {

  setTimeout(() => {
    turnCard();
  }, 2750);

  mouseMoveHandler = (event) => {
    const card = document.querySelector(`#card-${iCurrentCard.value}`);
    const band = card.querySelector(`.flip-card-band`);
    if (!card) return;
    
    // If the person tilts on the left, we'll show the first response
    if (event.clientX < windowCenterX - 200) {
      iChoice.value = 0;
      band.style.height = "20%";
    } else if (event.clientX > windowCenterX + 200) {
      iChoice.value = 1;
      band.style.height = "20%";
    } else {
      band.style.height = "0%";
    }
    const tiltRange = 7; // You can adjust the tilt range as needed
    const tilt = ((event.clientX - windowCenterX) / windowCenterX) * tiltRange;
    card.style.transform = `rotate(${tilt}deg) translate(-50%, calc(-50% + ${
      15 * iCurrentCard.value
    }px))`;
  };
  document.addEventListener("mousemove", mouseMoveHandler);
  //select the #app element
  document.querySelector("#clickable-part").addEventListener("click", updateCardDecision);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", mouseMoveHandler);
});


function updateCardDecision(event) {
  if (event.clientX < windowCenterX - 200) {
      decisionDone(0);
    } else if (event.clientX > windowCenterX + 200) {
      decisionDone(1);
    }
}

function turnCard() {
  if (iCurrentCard.value >= 0) {
    anime({
      targets: `#card-${iCurrentCard.value} .flip-card-inner`,
      keyframes: [
        { rotateY: 180 }
      ],
      scale: [1, 2, 1],
      duration: 250,
      easing: 'cubicBezier(0.450, 0.145, 0.240, 0.850);'
    });
  }
}

function togglePauseGame() {
  console.log("pause");
  if (pauseGame.value) {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.querySelector("#clickable-part").addEventListener("click", updateCardDecision);
    pauseGame.value = false;
  } else {
    document.removeEventListener("mousemove", mouseMoveHandler);
  document.querySelector("#clickable-part").removeEventListener("click", updateCardDecision);
    pauseGame.value = true;
  }
}

function infoPlayer() {
  console.log("info player");
}
</script>


<template>
  <div class="main-page">
    <h1 id="main-title">Tribunal</h1>
    <div id="clickable-part">
      <div id="description-current-card">
        <h1>Description</h1>
        <p>{{CARDS[iCurrentCard].context}}</p>
      </div>
    </div>
    <p to="/" class="pause-game" @click="togglePauseGame()">
      <img src="src/assets/icons/pause.svg" />
    </p>
    
    <div class="bottom-text">
      Choix {{ TOTAL_CARDS - iCurrentCard }} / {{ TOTAL_CARDS }}
    </div>

    <div id="cards">
      <Card
        v-for="(card, index) of CARDS"
        :name="card.name"
        :description="card.question"
        @click="turnCard()"
        :index="index"
        ref="cards"
        :ressources="card.responses[iChoice].impact"
        :response="card.responses[iChoice].name"
      ></Card>
    </div>
    <div id="player-info" @click="infoPlayer()"><img src="src/assets/icons/player.svg"></div>
  </div>
  <popupCardEnd v-if="endGame" :cardSelection="cardSelection"></popupCardEnd>
  <ThePause v-if="pauseGame" @resumeGame="togglePauseGame"></ThePause>
</template>
  
<style>
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    /* color-scheme: light dark; */
    color: rgba(0, 0, 0, 0.87);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  #description-current-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    max-width: 500px;
  }

  #description-current-card h1 {
      font-size: 1.5rem;
      margin: 0;
  }

  #description-current-card p {
      font-size: 0.9em;
      margin: 10px 0 0;
  }

  #main-title {
    position: absolute;
    font-size: 3rem;
    margin: 10px 0 0;
  }

  #player-info {
    position: absolute;
    left: 200px;
    bottom: 10px;
  }

  #player-info img {
    width: 80px;
  }

  .main-page {
    display: flex;
    justify-content: center;
  }

  #clickable-part {
    margin: 80px auto 0;
    width: 100%;
    height: 70vh;
    display: flex;
  }
  .pause-game {
    position: absolute;
    top: 5px;
    right: 5px;
    margin: 20px;
    cursor: pointer;
    width: 50px;
    height: 50px;
  }

  .pause-game img {
    width: 40px;
    height: 40px;
  }

  .bottom-text {
    position: absolute;
    bottom: 10px;
    width: 100%;
    margin: 20px;
    text-align: center;
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
  