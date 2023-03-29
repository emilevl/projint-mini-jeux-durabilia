<script setup>
import Card from './components/card.vue';
import ressource from './components/ressource.vue';

//Les noms et les niveaux pour chaque ressources (Les niveaux sont en pourcents)
const RESSOURCES_NAMES = [
  {name:'balance', level:40},
  {name:'bolt', level:20},
  {name:'brain', level:80},
  {name:'bulb', level:75},
  {name:'engagement', level:33},
  {name:'handshake', level:29},
  {name:'network', level:100},
  {name:'sober', level:0}
]

</script>

<template>
  <div id="ressources">
      <ressource v-for="name of RESSOURCES_NAMES" :name="name.name" :level="name.level" size="60px"></ressource>
  </div>
  
  <div id="cards">
    <Card name="Card 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></Card>
    <Card name="Card 2" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></Card>
    <Card name="Card 3" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></Card>
  </div>

</template>

<style scoped>
  #cards {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: normal;
    align-items: normal;
    align-content: normal;
    gap: 32px;
  }

  #ressources {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }
</style>
