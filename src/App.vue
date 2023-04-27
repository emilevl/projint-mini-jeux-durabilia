<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Card from './components/card.vue';
import ressource from './components/ressource.vue';
import TheCardInterface from './interfaces/TheCardInterface.vue';
import ThePlancheInterface from './interfaces/ThePlancheInterface.vue';
import ThePuzzleInterface from './interfaces/ThePuzzleInterface.vue';
import dataCards from "./assets/dataCards.json";
import MainGameInterface from './interfaces/MainGameInterface.vue';


const isPortrait = ref(window.innerHeight > window.innerWidth)

onMounted(() => {
  initializeDataCards();
  checkDeviceOrientation();
  window.addEventListener('resize', checkDeviceOrientation);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDeviceOrientation);
});

const checkDeviceOrientation = () => {
  isPortrait.value = window.innerHeight > window.innerWidth;
};

function initializeDataCards() {
  // Check if the dataCards item exists in the localStorage
  if (!localStorage.getItem("dataCards")) {
    // If not, set the dataCards item with the data imported from the JSON file
    localStorage.setItem("dataCards", JSON.stringify(dataCards));
  }
}

//construction des routes
const routes = {
  "#accueil": {
    label: "Accueil",
    id: "accueil",
    component: MainGameInterface,
  },
  "#tribunal": {
    label: "Tribunal",
    id: "tribunal",
    component: TheCardInterface,
  },
  "#step": {
    label: "STEP",
    id: "step",
    component: ThePuzzleInterface,
  },
  "#scierie": {
    label: "Scierie",
    id: "scierie",
    component: ThePlancheInterface,
  }
};

//Get current Hash
const hash = ref(window.location.hash);
window.addEventListener('hashchange', () => hash.value = window.location.hash);
const curHash = computed(() => routes[hash.value] ? hash.value : Object.keys(routes)[0]);

</script>

<template>
  
  <main>
    <div class="rotate-device" v-show="isPortrait">
      <div class="rotate-device-content">
        <h1>Merci de tourner ton appareil en mode paysage.</h1>
        <img src="/assets/icons/rotate-device.png" alt="Rotate device" />
        <!-- You can add an image or icon here if you prefer -->
      </div>
    </div>
    <template v-for="(route, hash) of routes" v-show="!isPortrait">
      <div v-if="hash == curHash">
        <component :is="route.component" />
      </div>
    </template>
  </main>
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
  background-image: url("/assets/img/background-gradient.jpg");
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

.rotate-device {
  display: flex;
  position: fixed;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url("/assets/img/background-gradient.jpg");
  background-size: cover;
  background-position: center;
}

.rotate-device h1 {
  font-size: 1.5em;
  text-align: center;
}

.rotate-device .rotate-device-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rotate-device .rotate-device-content img {
  width: 100px;
  height: 100px;
  margin-top: 30px;
}
</style>
