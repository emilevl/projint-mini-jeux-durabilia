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
const mobileImgExtension = ref("");
loadDataCards();


onMounted(() => {

  iCurrentCard.value = handCards.value.length - 1;
  setEventListeners();
  // matchmedia to change the image extension for mobile
  if (window.matchMedia("(max-width: 1050px)").matches) {
    mobileImgExtension.value = "-mobile";
  }
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

// document.addEventListener("DOMContentLoaded", () => {
  
  
  mouseMoveHandler = (event) => {
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
    }px), calc(-52% + ${2 * iCurrentCard.value}px))`;
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
}

drawCards();

function decisionDone() {

  if (!cardMoved.value) return;

  // add a style to the ressources to make their fill color
  // change to the color of the decision
  unsetEventListener();

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
    if (window.matchMedia("(min-width: 1050px)").matches) {
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

  function unsetEventListener() {
    if (window.matchMedia("(min-width: 1050px)").matches) {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.querySelector("#clickable-part").removeEventListener("click", updateCardDecision);
    } else {
      if (endGame.value) return;
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
}

function togglePauseGame() {
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

async function  fetchSvgContent(icon) {
    const response = await fetch(`/assets/icons/${icon}.svg`);
    const content = await response.text();
    return content;
  }

onUnmounted(() => {
  unsetEventListener();
  // document.removeEventListener("mousemove", mouseMoveHandler);
});
</script>


<template>
  <div class="main-page" :style="{ backgroundImage: 'url(/assets/cinematics/court-light' + mobileImgExtension + '.jpg)' }">
    <div id="clickable-part">
      <div id="description-current-card">
        <h2>Description</h2>
        <p>{{ handCards[iCurrentCard].context }}</p>
      </div>
    </div>
    <h1 to="/" class="pause-game" @click="togglePauseGame()">Menu</h1>

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

    <div class="ressources-impact">
      <div
        v-for="ressource of handCards[iCurrentCard].responses[iChoice].impact"
        :class="`ressource-icon-wrapper ${iconColored ? ressource.level < 0 ? 'ressource-icon-red' : 'ressource-icon-green': ''} ${cardsDrawn && cardMoved ? '' : 'display-none'}`"
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
  </div>

  <popupCardEnd v-if="endGame" :cardSelection="cardSelection"></popupCardEnd>
  <ThePause
    v-if="pauseGame"
    :transformer="CURRENT_TRANSFORMER"
    @resumeGame="togglePauseGame"
  ></ThePause>
</template>
  
<style>
:root {
  overflow: hidden;
}

.pause-menu {
  z-index: 999999;
}

#description-current-card {
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
  height: 100vh;
  background-size: cover;
  background-position: bottom;
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
  position: absolute;
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
    left: 10px;
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
    padding-top: 0px;
  }

  .ressources-impact .circle-container {
    height: 20px;
    width: 95%;
    justify-content: right;
    display: flex;
    align-items: end;
  }
}
</style>
  