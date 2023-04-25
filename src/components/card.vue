<script setup>
import { ref, onMounted} from 'vue';
import anime from 'animejs/lib/anime.es.js';
import CardBack from './card-back.vue';


const props = defineProps({
  title: String,
  question: String,
  index: Number,
  ressources: Array,
  response: String
})

// define emit function with the event name "cardLoaded"
const emit = defineEmits(['cardLoaded'])

let ressourceTemplating = ref(props.ressources.length)


onMounted(() => {
  anime({
    targets: '.flip-card .flip-card-inner',
    keyframes: [
      { translateY: ['1000', '0'] }
    ],
    duration: 500,
    delay: anime.stagger(500),
    easing: 'spring(1, 80, 10, 0)',
    complete: function(anim) {
      if (anim.id === 4) {
        emit('cardLoaded');
      }
    }
  });
})

</script>


<template>
  <div class="flip-card" :id="`card-${props.index}`" :style="{
    transform: 'translate(calc(-50% - ' + (7 * index) + 'px), calc(-52% + ' + (2 * index) + 'px))'
  }">
    <div class="flip-card-inner">
      <div class="flip-card-front"></div>
      <CardBack :title="title" :question="question" :response="response"></CardBack>
    </div>
  </div>
</template>

<style scoped>
  .flip-card {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 412.5px;
    height: 550px;
    color: #FFD7B2;
    z-index: 1;
    transform-origin: left center;
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
    -webkit-box-shadow: 1px -1px 4px -1px rgba(0,0,0,0.7);
    -moz-box-shadow: 1px -1px 4px -1px rgba(0,0,0,0.7);
    box-shadow: 1px -1px 4px -1px rgba(0,0,0,0.7);
  }

  .flip-card-front {
    background-image: url('/assets/img/back-card.jpg');
    background-size: cover;
    background-position: center;
  }

  .flip-card-back .card-title {
    height: 25.5%;
    padding: 25px 25px 0 25px;
  }

  .flip-card-back img {
    width: 93%
  }

  .flip-card-back .card-question {
    height: 34.5%;
    padding: 0 25px;
    text-align: left; 
  }

  .flip-card-back {
    background: radial-gradient(50% 50% at 50% 50%, #434343 0%, #282828 100%);;
    transform: rotateY(180deg);
  }

  .flip-card-band {
    position: absolute;
    bottom: 25px;
    left: 5%;
    width: 90%;
    height: 0%;
    background-color: #FFD7B2;
    transition: 0.5s ease;
    overflow: hidden;
    border-radius: 20px 0px;
    display: flex;
    justify-content: center;
  }

  .flip-card-band .flip-card-response {
    align-self: center;
    color: black;
    font-weight: 600;
  }

  .ressource-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  /*------------------------ MOBILE ------------------- */
  @media screen and (max-width: 1050px) {
    .flip-card {
      width: 225px;
      height: 300px;
    }
    
  }
</style>
