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

  // function changeBackgroundCards() {
  //   setTimeout(() => {
  //     document.querySelectorAll('.flip-card-front').forEach((card, index) => {
  //       card.style.backgroundImage = `url('src/assets/img/back-card-blurred.jpg')`;
  //     });
  //   }, 1000);
    
  // }

  // change the background img of the card

  // rotate only the first card
  // setTimeout(() => {
  //   anime({
  //     targets: `#card-${props.index} .flip-card-inner`,
  //     keyframes: [
  //       { rotateY: 180 }
  //     ],
  //     duration: 1000,
  //     delay: anime.stagger(500),
  //     easing: 'spring(1, 80, 10, 0)'
  //   });
  // }, 2500);
  // anime({
  //   targets: `#card-${props.index} .flip-card-inner`,
  //   keyframes: [
  //     { rotateY: 180 }
  //   ],
  //   duration: 1000,
  //   delay: anime.stagger(500),
  //   easing: 'spring(1, 80, 10, 0)'
  // });
})

</script>


<template>
  <div class="flip-card" :id="`card-${props.index}`" :style="{
    transform: 'translate(calc(-50% - ' + (7 * index) + 'px), calc(-60% + ' + (2 * index) + 'px))'
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
    /* width: calc(64vh * 0.64);
    max-width: 480px;
    max-height: 750px;
    min-width: 300px;
    min-height: 480px; 
    height: 64vh; */
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
    /* box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07); */
  }

  .flip-card-front {
    /* background-color: #912727; */
    background-image: url('/assets/img/back-card.jpg');
    background-size: cover;
    background-position: center;
  }

  .flip-card-back .card-title {
    /* height: 153px; */
    height: 25.5%;
    padding: 25px 25px 0 25px;
  }

  .flip-card-back img {
    width: 93%
  }

  .flip-card-back .card-question {
    /* height: 207px; */
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
    /* display: grid;
    grid-template-columns: auto; */
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
      position: absolute;
      top: 195px;
      left: 50%;
    }
    
  }
  /* @media (max-width: 1080px) {

    /* Apply different styles for small screens */
    /* .flip-card { */
      /* width: calc(45vh * 0.64);
      height: 45vh;
      max-width: 400px;
      max-height: 600px;
      min-width: 250px;
      min-height: 380px; */
      /* width: 337px; 
      height: 450px;
    }

    .flip-card-back h1 {
      font-size: 1.5rem;
    }

    .flip-card-back p {
      font-size: 1.1rem;
      font-weight: bold;
    }

    .flip-card-back .flip-card-band .flip-card-response {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 900px) {

    /* Apply different styles for very small screens */
    /* .flip-card { */
      /* width: calc(30vh *0.64);
      height: 30vh;
      max-width: 200px;
      max-height: 400px; 
      min-width: 147.2px;
      min-height: 230px; */
      /* width: 184px;
      height: 246px;
    }

    .flip-card-back h1 {
      font-size: 1.5rem;
    }

    .flip-card-back p {
      font-size: 0.8rem;
    }

    .flip-card-back .flip-card-band .flip-card-response {
      font-size: 0.6rem;
    }
  } */
</style>
