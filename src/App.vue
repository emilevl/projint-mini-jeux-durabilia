<script setup>
import { ref, computed, onMounted } from 'vue';
import Card from './components/card.vue';
import ressource from './components/ressource.vue';
import TheCardInterface from './interfaces/TheCardInterface.vue';
import ThePlancheInterface from './interfaces/ThePlancheInterface.vue';
import ThePuzzleInterface from './interfaces/ThePuzzleInterface.vue';
import dataCards from "./assets/dataCards.json";
import MainGameInterface from './interfaces/MainGameInterface.vue';


onMounted(() => {
  initializeDataCards();
});

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
  "#card": {
    label: "Card",
    id: "card",
    component: TheCardInterface,
  },
  "#puzzle": {
    label: "Puzzle",
    id: "puzzle",
    component: ThePuzzleInterface,
  },
  "#planche": {
    label: "Planche",
    id: "planche",
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
    <template v-for="(route, hash) of routes">
      <div v-show="hash == curHash">
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
</style>
