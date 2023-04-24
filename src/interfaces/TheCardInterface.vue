<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount, watchEffect } from "vue";
/* add icons to the library */
import Card from "../components/card.vue";
import popupCardEnd from "../components/popupCardEnd.vue";
import ressource from "../components/ressource.vue";
import dataCardsJson from "../assets/dataCards.json";
import anime from "animejs/lib/anime.es";
import { ressourceGlobal, transformers } from "../utils/store.js";
import ThePause from "../components/ThePause.vue";
import popupRules from "../components/popupRules.vue";

const CURRENT_TRANSFORMER = transformers.value.find(
  (transformer) => transformer.name == "Tribunal"
);


const iCurrentCard = ref(4);
const handCards = ref([]);
const cardsDrawn = ref(false);
const handCardsCopy = ref([]);
const dataCards = ref([]);
const TOTAL_CARDS = 5;
const svgContent = ref({});
const iconColored = ref(false);
// choices are from the dataCards object: 0 = choice 1, 1 = choice -> cards.responses[choice]
const iChoice = ref(0);
const choosing = ref(false);
let mouseMoveHandler;
let touchMoveHandler;
let touchStartHandler;
let cardSelection = ref([]);
const endGame = ref(false);
const pauseGame = ref(false);
const cardMoved = ref(false);
loadDataCards();


onMounted(() => {

  iCurrentCard.value = handCards.value.length - 1;
});

watchEffect(() => {
  handCards.value.forEach(async (card) => {
    
    for(let i= 0; i < card.responses[iChoice.value].impact.length; i++){
      const ressource = card.responses[iChoice.value].impact[i].ressource;
      if (!svgContent.value[ressource]) {
        const response = await fetch(`/assets/icons/${ressource}.svg`);
        const text = await response.text();
        svgContent.value[ressource] = text;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  
  
  mouseMoveHandler = (event) => {
    console.log("touchCArds")
    const card = document.querySelector(`#card-${iCurrentCard.value}`);
    const band = card.querySelector(`.flip-card-band`);
    if (!card) return;
    
    // If the person tilts on the left, we'll show the first response
    if (event.clientX < windowCenterX - 200) {
      choosing.value = true;
      iChoice.value = 0;
      band.style.height = "17%";
      cardMoved.value = true;
    } else if (event.clientX > windowCenterX + 200) {
      choosing.value = true;
      iChoice.value = 1;
      band.style.height = "17%";
      cardMoved.value = true;
    } else {
      choosing.value = false;
      band.style.height = "0%";
      cardMoved.value = false;
    }
    const tiltRange = 7; // You can adjust the tilt range as needed
    const tilt =
      ((event.clientX - windowCenterX) / windowCenterX) * tiltRange;
    card.style.transform = `rotate(${tilt}deg) translate(calc(-50% - ${
      7 * iCurrentCard.value
    }px), calc(-60% + ${2 * iCurrentCard.value}px))`;
  };
  
  let initialTouchX = null;
  let initialTouchY = null;
  let initialCardX = null;
  let initialCardY = null;
  
  touchStartHandler = (e) => {
    const touch = e.touches[0];
    initialTouchX = touch.clientX;
    initialTouchY = touch.clientY;

    const card = document.querySelector(`#card-${iCurrentCard.value}`);
    const cardRect = card.getBoundingClientRect();
    initialCardX = cardRect.left;
    initialCardY = cardRect.top;
  };

  touchMoveHandler = (e) => {
    e.preventDefault();
    const card = document.querySelector(`#card-${iCurrentCard.value}`);
    const band = card.querySelector(`.flip-card-band`);
    if (!card) return;
    const touch = e.touches[0];

    // Calculate the position of the card based on the difference between the initial and current touch positions
    const cardX = initialCardX + touch.clientX - initialTouchX;
    const cardY = initialCardY + touch.clientY - initialTouchY;

    // Set the card position
    card.style.position = "absolute";
    card.style.left = cardX + "px";
    card.style.top = cardY + "px";

    // Calculate tilt based on touch position
    const tiltRange = 7;
    const tilt = ((touch.clientX - windowCenterX) / windowCenterX) * tiltRange;

    // Apply the tilt effect to the card
    card.style.transform = `rotate(${tilt}deg)`;

    const cardRect = card.getBoundingClientRect();


    // Show the band when needed
    if (cardRect.left + cardRect.width / 2 < windowCenterX - 25) {
      iChoice.value = 0;
      band.style.height = "15%";
      cardMoved.value = true;
    } else if (cardRect.left + cardRect.width / 2 > windowCenterX + 25) {
      iChoice.value = 1;
      band.style.height = "15%";
      cardMoved.value = true;
    } else {
      band.style.height = "0%";
      cardMoved.value = false;
    }
  };
    setEventListeners();
  });
  
  // TODO: Detect if the user is on a mobile device or not
  // const platform = navigator.platform.toLowerCase();
  //   if (/(android|webos|iphone|ipad|ipod|blackberry|windows phone)/.test(platform)) {
  //       // this.deviceType = 'mobile';
  //       console.log("mobile")
  //   } else if (/mac|win|linux/i.test(platform)) {
  //       // this.deviceType = 'desktop';
  //       console.log("desktop")
  //   } else if (/tablet|ipad/i.test(platform)) {
  //       // this.deviceType = 'tablet';
  //       console.log("tablet")
  //   } else {
  //       // this.deviceType = 'unknown';
  //       console.log("unknown")
  //   }
  //select the #app element


function loadDataCards() {
  dataCards.value = dataCardsJson;
}

function drawCards() {
  // Create a copy of the dataCards array to avoid modifying the original array
  const tempCards = [...dataCards.value.cards];

  // Draw 5 random cards
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * tempCards.length);
    handCards.value.push(tempCards[randomIndex]);
    tempCards.splice(randomIndex, 1);
  }
  cardsDrawn.value = true;

  // for(const card of handCardsCopy.value) {
  //   console.log("test")
  //   console.log(card)
  // }
}

drawCards();
// create a new array with 5 of the dataCards objects
// for (let i = 0; i < 5; i++) {
//   // add the card from the dataCards object to the handCards array
//   handCards.value.push(dataCardsJson.cards[i]);
//   // dataCards.cards[i].id = i
// }

function decisionDone() {

  if (!cardMoved.value) return;

  // add a style to the ressources to make their fill color
  // change to the color of the decision
  removeEventListener();

  iconColored.value = true;
  
  
  // add the decision to the choice array
  const currentCard = handCards.value[iCurrentCard.value];
  currentCard.decision = iChoice.value;
  cardSelection.value.push(currentCard);


  if (iCurrentCard.value === 0) {
    // end of the game
    endGame.value = true;
    return;
  }

  // animate the card to leave the page from the left or right, down
  // console.log(iCurrentCard.value)
  const card = document.querySelector(
    `#card-${iCurrentCard.value} .flip-card-inner`    
  );
  
  if (iChoice.value === 0) {
    // anime the card so it rotates fluently to the left bottom of the screen
    anime({
      targets: card,
      translateX: 700,
      translateY: 250,
      rotate: "90deg",
      opacity: [1, 0.7, 0.5, 0],
      duration: 250,
    });
  } else {
    // anime the card so it rotates fluently to the right bottom of the screen
    anime({
      targets: card,
      translateX: -700,
      translateY: 250,
      rotate: "-90deg",
      opacity: [1, 0.7, 0.5, 0],
      duration: 250,
    });
  }
  // wait for the animation to finish
  setTimeout(() => {
    // remove the card from the handCards array
    iCurrentCard.value--;
    handCards.value.pop();
    turnCard();
    setEventListeners();
    iconColored.value = false;
  }, 500);
  
}

const windowCenterX = window.innerWidth / 2;


  function setEventListeners() {
    if (window.innerWidth > 1050) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.querySelector("#clickable-part").addEventListener("click", updateCardDecision);
    } else {
      document.querySelector(`#card-${iCurrentCard.value} .flip-card-inner`).addEventListener("touchstart", touchStartHandler);
      // select the #app element
      // document.querySelector("#clickable-part").addEventListener("click", updateCardDecision);
      document.querySelector(`#card-${iCurrentCard.value} .flip-card-inner`).addEventListener("touchmove", touchMoveHandler);
        document.querySelector(`#card-${iCurrentCard.value} .flip-card-inner`).addEventListener("touchend", decisionDone);
    }
  }

  function removeEventListener() {
    if (window.innerWidth > 1050) {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.querySelector("#clickable-part").removeEventListener("click", updateCardDecision);
    } else {
      document.querySelector(`#card-${iCurrentCard.value} .flip-card-inner`).removeEventListener("touchmove", touchMoveHandler);
      document.querySelector(`#card-${iCurrentCard.value} .flip-card-inner`).removeEventListener("touchend", decisionDone);
    }
  }

function updateCardDecision(event) {
  const sound = new Audio('/assets/sounds/card-selection.wav')
    sound.play()
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
      keyframes: [{ rotateY: 180 }],
      scale: [1, 2, 1],
      duration: 250,
      easing: "cubicBezier(0.450, 0.145, 0.240, 0.850);",
    });
  }
}

function cardLoaded() {
  setTimeout(() => {
    turnCard();
  }, 500);
  console.log("card loaded");
  // if (iCurrentCard.value === 0) {
  //   setListeners();
  // }
}

function togglePauseGame() {
  console.log("pause");
  if (pauseGame.value) {
    document.addEventListener("mousemove", mouseMoveHandler);
    document
      .querySelector("#clickable-part")
      .addEventListener("click", updateCardDecision);
    pauseGame.value = false;
  } else {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document
      .querySelector("#clickable-part")
      .removeEventListener("click", updateCardDecision);
    pauseGame.value = true;
  }
}

function infoPlayer() {
  console.log("info player");
}

function getRessourceNameByImg(imgName) {
  const ressource = ressourceGlobal.value.find((r) => r.img === imgName);
  return ressource ? ressource.name : '';
}

function donePlaying() {
  // Remove the drawn cards from the deck
  dataCards.value = dataCards.value.filter(card => !handCards.value.includes(card));

  // Clear the handCards array
  handCards.value = [];
}

const activeRules = ref(true)
function toggleRules(){
  activeRules.value = !activeRules.value
}

async function  fetchSvgContent(icon) {
    const response = await fetch(`/assets/icons/${icon}.svg`);
    const content = await response.text();
    return content;
  }

// TODO: Function to remove / add all the event listeners in one time ? 

onUnmounted(() => {
  document.removeEventListener("mousemove", mouseMoveHandler);
});
</script>


<template>
  <div class="main-page">
    <div id="clickable-part">
      <div id="description-current-card">
        <h2>Description</h2>
        <p>{{ handCards[iCurrentCard].context }}</p>
      </div>
    </div>
    <h1 to="/" class="pause-game" @click="togglePauseGame()">Menu</h1>

    <!-- <div class="cardNo-onNo">
      <h1>{{ TOTAL_CARDS - iCurrentCard }} / {{ TOTAL_CARDS }}</h1>
    </div> -->

    <div id="cards">
      <Card
        v-for="(card, index) of handCards"
        :title="card.title"
        :question="card.question"
        @click="turnCard()"
        :index="index"
        ref="cards"
        :ressources="card.responses[iChoice].impact"
        :response="card.responses[iChoice].name"
        @card-loaded="cardLoaded"
      ></Card>
    </div>
    <!-- <div id="player-info" @click="infoPlayer()"><img src="src/assets/icons/player.svg"></div> -->
  </div>
  <div class="ressources-impact">
    <div
      v-for="ressource of handCards[iCurrentCard].responses[iChoice].impact"
      :class="`ressource-icon-wrapper ${iconColored ? ressource.level > 0 ? 'ressource-icon-red' : 'ressource-icon-green': ''} ${cardsDrawn && cardMoved ? '' : 'display-none'}`"
    >
      <div class="circle-container">
        <div
          class="circle"
          :style="{
            height: `${Math.pow((Math.abs(ressource.level) / 10), 1.5) + 5}px`,
            width: `${Math.pow((Math.abs(ressource.level) / 10), 1.5) + 5}px`,
          }"
        ></div>
      </div>

      <div 
        v-html="svgContent[ressource.ressource]"
      ></div>

      <p> {{ getRessourceNameByImg(ressource.ressource) }}</p>
    </div>
  </div>

  <popupCardEnd v-if="endGame" :cardSelection="cardSelection"></popupCardEnd>
  <ThePause
    v-if="pauseGame"
    :transformer="CURRENT_TRANSFORMER"
    @resumeGame="togglePauseGame"
  ></ThePause>
  <popupRules v-if="activeRules" :transformer="CURRENT_TRANSFORMER" :gameLaunched="false" @emitPlay="toggleRules()"></popupRules>
</template>
  
<style>
:root {
  overflow: hidden;
}

.pause-menu {
  z-index: 999999;
}

#description-current-card {
  /* display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    max-width: 500px; */
  position: absolute;
  left: 0;
  margin: 0 0 0 5%;
  bottom: 100px;
  max-width: 434px;
  height: 200px;
}

#description-current-card p {
  margin: 10px 0 0;
}

.display-none {
  visibility: hidden !important;
  opacity: 0 !important;
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
  top: 10px;
  right: 0px;
  margin: 0 5% 0 0;
  cursor: pointer;
}

.pause-game img {
  width: 40px;
  height: 40px;
}

.cardNo-onNo {
  position: absolute;
  top: 10px;
  left: 0px;
  width: 30%;
  margin: 0 0 0 5%;
}

.cardNo-onNo h1 {
  text-align: center;
  text-align: left;
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

.ressources-impact {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  /* position: absolute; */
  bottom: 10px;
  margin: 35px auto;
}

.ressource-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.2s linear;
  width: 120px;
}

.ressources-impact .circle {
  background-color: #000;
  border-radius: 50%;
}

.ressource-icon-wrapper p {
  font-size: 1.1rem;
  justify-self: center;
  align-self: center;
  padding-top: 10px;
}

.ressource-icon-wrapper.ressource-icon-red .circle {
  background-color: #e82d2d;
}

.ressource-icon-wrapper.ressource-icon-green .circle {
  background-color: #19ac19;
}

.ressource-icon-wrapper.ressource-icon-green .circle, .ressource-icon-wrapper.ressource-icon-green path .circle, .ressource-icon-wrapper.ressource-icon-red .circle, .ressource-icon-wrapper.ressource-icon-red path {
  transition: all 0.1s ease;
}

.ressource-icon-wrapper.ressource-icon-red path {
  fill: #e82d2d;
}

.ressource-icon-wrapper.ressource-icon-green path {
  fill: #19ac19
}


.ressources-impact .circle-container {
  height: 20px;
  width: 20px;
  justify-content: end;
  display: flex;
  align-items: center;
}

.ressources-impact img {
  height: 60px;
  margin-top: 7px;
}

/*------------------------ MOBILE ------------------- */
@media screen and (max-width: 1050px) {
  .pause-game {
    font-size: 1.6rem;
  }

  .cardNo-onNo h1 {
    text-align: center;
    text-align: left;
    font-size: 1.6rem;
  }

  #description-current-card {
    position: absolute;
    left: 65%;
    bottom: 65px;
    max-width: 210px;
    height: 100px;
  }

  #description-current-card p {
    font-size: 0.7rem;
  }

  #description-current-card h2 {
    font-size: 1.2rem;
  }

  .ressources-impact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    position: absolute;
    bottom: 5px;
    margin: 10px 10px;
  }

  .ressources-impact .ressource-icon-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .ressource-icon-wrapper {
    width: 85px;
  }

  .ressources-impact .ressource-icon-wrapper img {
    margin-top: 0;
    height: 25px;
  }

  .ressources-impact .ressource-icon-wrapper p {
    font-size: 0.8rem;
    padding-top: 5px;
  }

  .ressources-impact .circle-container {
    height: 20px;
    width: 95%;
    justify-content: right;
    display: flex;
    align-items: end;
  }
}
/* @media (max-width: 900px) {

    #main-title {
      font-size: 1.5rem;
      margin: 5px 0 0;
    }

    .bottom-text {
        bottom: 5px;
    }
    
    .bottom-text p {
        font-size: 0.9em;
    }

    #description-current-card {
      margin-left: 5px;
      max-width: 275px;
      position: absolute;
      top: 50px;
    }

    #description-current-card h1 {
        font-size: 1.3rem;
        margin: 0;
    }

    #description-current-card p {
        font-size: 0.9em;
        margin: 5px 0 0;
    }
} */
</style>
  