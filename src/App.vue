<script setup>
import Card from './components/card.vue';
</script>

<template>
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
</style>
