<script setup>
import { ref, computed, onMounted } from 'vue';
import Card from './components/card.vue';
import ressource from './components/ressource.vue';
import TheCardInterface from './interfaces/TheCardInterface.vue';
import ThePlancheInterface from './interfaces/ThePlancheInterface.vue';
import ThePuzzleInterface from './interfaces/ThePuzzleInterface.vue';
import dataCards from "./assets/dataCards.json";


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
const curHash = computed(() => routes[hash.value] ? hash.value : '');

</script>

<template>
  
  <main>
    <template v-for="(route, hash) of routes">
      <div v-if="hash == curHash">
        <component :is="route.component" />
      </div>
    </template>
  </main>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: url("assets/img/background-gradient.jpg");
    width: 100vw;
    font-family: 'Urbanist', 'Inter', sans-serif;
    font-size: 3rem;
  }

  .container .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-direction: column;
  }

  .container .nav li {
    padding: 100px;
    margin: 30px;
  }

  .container .nav li a {
    all: unset;
    font-size: 2.5rem;
    padding: 30px 15px;
    margin: 30px 30px;
    font-family: 'Limelight', 'Inter', sans-serif;
    cursor: pointer;
    transition: 0.3s;
    text-align: center;
  }

  .container .nav li:hover a{
    background-color: black;
    color: #FBF8F1;
    border-radius: 10px 0px;
    transition: 0.3s;
}

  /* .container .nav li a {
    text-decoration: none;
    color: black;
  } */
  
</style>
