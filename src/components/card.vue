<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import anime from 'animejs/lib/anime.es.js';


const props = defineProps({
  name: String,
  description: String,
  index: Number,
  ressources: Object,
  response: String
})

let ressourceTemplating = ref(props.ressources.length)

onMounted(() => {
  anime({
    targets: '.flip-card .flip-card-inner',
    keyframes: [
      { translateY: ['1000', '0'] },
      { rotateY: 180 }
    ],
    duration: 1000,
    delay: anime.stagger(500),
    easing: 'spring(1, 80, 10, 0)'
  });
})

</script>


<template>
  <div class="flip-card" :id="`card-${props.index}`" :style="{
    transform: 'translate(-50%, calc(-50% + ' + (15 * index) + 'px))'
  }">
    <div class="flip-card-inner">
      <div class="flip-card-front"></div>
      <div class="flip-card-back">
        <h1>{{ name }}</h1>
        <p>{{ description }}</p>
        <div class="flip-card-ressources">
          <div v-for="ressource of props.ressources" class="ressource-icon-wrapper">
            <img :src="`src/assets/icons/${ressource.name}.svg`">
            <div class="circle" :style="{
              height: `${((ressource.level/100)*10)+5}px`,
              width: `${((ressource.level/100)*10)+5}px`
            }"></div>
          </div>
        </div>
        <div class="flip-card-band">
          <p class="flip-card-response">{{ response }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(64vh * 0.64);
  max-width: 480px;
  max-height: 750px;
  height: 64vh;
  transform-origin: left center;
}

@media (max-width: 767px) {

  /* Apply different styles for small screens */
  .flip-card {
    width: calc(45vh * 0.64);
    height: 45vh;
  }
}

@media (max-width: 479px) {

  /* Apply different styles for very small screens */
  .flip-card {
    width: calc(40 *0.64);
    height: 40vh;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow:
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}

.flip-card-front {
  background-color: #912727;
  color: black;
}

.flip-card-back {
  background-color: white;
  color: #000;
  transform: rotateY(180deg);
}

.flip-card-band {
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: auto;
  width: 100%;
  height: 0%;
  background-color: lightblue;
  transition: 0.5s ease;
  overflow: hidden;
}

.flip-card-ressources {
  position: absolute;
  top: 50%;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(v-bind(ressourceTemplating), 1fr);
}

.ressource-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  height: 50px;
  margin-bottom: 20px;
}

.circle {
  background-color: #000;
  border-radius: 50%;
}
</style>
