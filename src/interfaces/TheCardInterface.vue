<script setup>
import { ref, onMounted, onUnmounted } from "vue";
/* add icons to the library */
import Card from "../components/card.vue";
import popupCardEnd from "../components/popupCardEnd.vue";
import ressource from "../components/ressource.vue";
import dataCards from "../assets/dataCards.json";
import anime from "animejs/lib/anime.es";
import { ressourceGlobal, transformers } from "../utils/store.js";
import ThePause from "../components/ThePause.vue";

const CURRENT_TRANSFORMER = transformers.value.find(
  (transformer) => transformer.name == "Tribunal"
);

const handCards = ref([]);
const TOTAL_CARDS = 5;
// choices are from the dataCards object: 0 = choice 1, 1 = choice -> cards.responses[choice]
const iChoice = ref(0);
const choosing = ref(false);
let mouseMoveHandler;
let touchMoveHandler;
let cardSelection = ref([]);
const endGame = ref(false);
const pauseGame = ref(false);
const cardMoved = ref(false);


onMounted(() => {
  setListeners();

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

  setTimeout(() => {
    turnCard();
  }, 2750);
  //select the #app element
});

// create a new array with 5 of the dataCards objects
for (let i = 0; i < 5; i++) {
  // add the card from the dataCards object to the handCards array
  handCards.value.push(dataCards.cards[i]);

  // dataCards.cards[i].id = i
}
const iCurrentCard = ref(handCards.value.length - 1);

function decisionDone() {
  if (!cardMoved.value) return;

  // add the decision to the choice array
  const currentCard = handCards.value[iCurrentCard.value];
  currentCard.decision = iChoice.value;
  cardSelection.value.push(currentCard);

  // remove the event listeners
  document.removeEventListener("mousemove", mouseMoveHandler);
  document
    .querySelector("#clickable-part")
    .removeEventListener("click", updateCardDecision);
  document
    .querySelector(`#card-${iCurrentCard.value} .flip-card-inner`)
    .removeEventListener("touchmove", touchMoveHandler);
  document
    .querySelector(`#card-${iCurrentCard.value} .flip-card-inner`)
    .removeEventListener("touchend", decisionDone);

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

    document.addEventListener("mousemove", mouseMoveHandler);
    document
      .querySelector("#clickable-part")
      .addEventListener("click", updateCardDecision);
    document
      .querySelector(`#card-${iCurrentCard.value} .flip-card-inner`)
      .addEventListener("touchmove", touchMoveHandler);
    document
      .querySelector(`#card-${iCurrentCard.value} .flip-card-inner`)
      .addEventListener("touchend", decisionDone);
  }, 250);
}

const windowCenterX = window.innerWidth / 2;


function setListeners() {
    mouseMoveHandler = (event) => {
      const card = document.querySelector(`#card-${iCurrentCard.value}`);
      const band = card.querySelector(`.flip-card-band`);
      if (!card) return;

      // If the person tilts on the left, we'll show the first response
      if (event.clientX < windowCenterX - 200) {
        choosing.value = true;
        iChoice.value = 0;
        band.style.height = "100px";
        cardMoved.value = true;
      } else if (event.clientX > windowCenterX + 200) {
        choosing.value = true;
        iChoice.value = 1;
        band.style.height = "100px";
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

      touchMoveHandler = (e) => {
        // e.preventDefault();
        console.log("touchmove");
        // move the card following the finger
        const card = document.querySelector(`#card-${iCurrentCard.value}`);
        const band = card.querySelector(`.flip-card-band`);
        if (!card) return;
        const touch = e.touches[0];

        // show the band when needed
        if (touch.clientX < windowCenterX - 25) {
          iChoice.value = 0;
          band.style.height = "100px";
          cardMoved.value = true;
        } else if (touch.clientX > windowCenterX + 25) {
          iChoice.value = 1;
          band.style.height = "100px";
          cardMoved.value = true;
        } else {
          band.style.height = "0%";
          cardMoved.value = false;
        }

        card.style.position = "absolute";
        // the center of the card is centered on the finger
        card.style.left = touch.clientX - card.clientWidth / 2 + "px";
        card.style.top = touch.clientY - card.clientHeight / 2 + "px";
        // card.style.transform = "none";
        // console log the width of the card
        // console.log(card.clientWidth)

        const tiltRange = 7; // You can adjust the tilt range as needed
        const tilt =
          ((touch.clientX - windowCenterX) / windowCenterX) * tiltRange;
        card.style.transform = `rotate(${tilt}deg)`;
      };

      // when the user stops touching the screen
      document
        .querySelector(`#card-${iCurrentCard.value} .flip-card-inner`)
        .addEventListener("touchend", decisionDone);
    };

    // check if we are on a desktop or a mobile device
    // if (window.innerWidth > 1080) {
    if (window.innerWidth > 500) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document
        .querySelector("#clickable-part")
        .addEventListener("click", updateCardDecision);
    } else {
      // select the #app element
      // document.querySelector("#clickable-part").addEventListener("click", updateCardDecision);
      document
        .querySelector(`#card-${iCurrentCard.value} .flip-card-inner`)
        .addEventListener("touchmove", touchMoveHandler);
    }
  }

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
      keyframes: [{ rotateY: 180 }],
      scale: [1, 2, 1],
      duration: 250,
      easing: "cubicBezier(0.450, 0.145, 0.240, 0.850);",
    });
  }
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

onUnmounted(() => {
  document.removeEventListener("mousemove", mouseMoveHandler);
});
</script>


<template>
  <div class="main-page">
    <!-- <h1 id="main-title">Tribunal</h1> -->
    <div id="clickable-part">
      <div id="description-current-card">
        <h2>Description</h2>
        <p>{{ handCards[iCurrentCard].context }}</p>
      </div>
    </div>
    <h1 to="/" class="pause-game" @click="togglePauseGame()">Menu</h1>

    <div class="cardNo-onNo">
      <h1>{{ TOTAL_CARDS - iCurrentCard }} / {{ TOTAL_CARDS }}</h1>
    </div>

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
      ></Card>
    </div>
    <!-- <div id="player-info" @click="infoPlayer()"><img src="src/assets/icons/player.svg"></div> -->
  </div>
  <div class="ressources-impact">
    <div
      v-for="ressource of handCards[iCurrentCard].responses[iChoice].impact"
      class="ressource-icon-wrapper"
    >
      <div class="circle-container">
        <div
          class="circle"
          :style="{
            height: `${(Math.abs(ressource.level) / 100) * 20 + 5}px`,
            width: `${(Math.abs(ressource.level) / 100) * 20 + 5}px`,
          }"
        ></div>
      </div>

      <img :src="`src/assets/icons/${ressource.ressource}.svg`" />
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
  font-family: "Limelight", Inter, system-ui, Avenir, Helvetica, Arial,
    sans-serif;
  line-height: 1.5;
  font-weight: 400;

  /* color-scheme: light dark; */
  color: rgba(0, 0, 0, 0.87);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  /* background-color: #FDFCFC; */
  background-image: url("src/assets/img/background-gradient.jpg");
  background-size: 100% auto;
  background-position: center;
}

h1 {
  font-size: 3rem;
  margin: 0;
  text-transform: uppercase;
}

h2 {
  font-size: 2.5rem;
  margin: 0;
  text-transform: uppercase;
}

h3 {
  font-size: 2rem;
  margin: 0;
  text-transform: uppercase;
}

p {
  font-size: 1.2rem;
  font-family: "Urbanist", "Inter", sans-serif;
  margin: 0;
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
}

#description-current-card p {
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
  align-items: end;
}

.ressources-impact .circle {
  background-color: #000;
  border-radius: 50%;
}

.ressources-impact .circle-container {
  height: 20px;
  width: 20px;
  justify-content: center;
  display: flex;
  align-items: center;
}

.ressources-impact img {
  height: 60px;
  margin-top: 7px;
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
  