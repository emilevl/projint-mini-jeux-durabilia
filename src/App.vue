<script setup>
import { ref, computed } from 'vue';
import Card from './components/card.vue';
import ressource from './components/ressource.vue';
import TheCardInterface from './interfaces/TheCardInterface.vue';
import ThePlancheInterface from './interfaces/ThePlancheInterface.vue';
import ThePuzzleInterface from './interfaces/ThePuzzleInterface.vue';

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

<style scoped>
</style>
