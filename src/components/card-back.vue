<script setup>
import { ref, onMounted} from 'vue';


const props = defineProps({
  title: String,
  question: String,
  response: String
})

</script>


<template>
      <div class="flip-card-back">
        <h3 class="card-title">{{ title }}</h3>
        <img src="/assets/img/separator-card.svg" alt="separator">
        <p class="card-question">{{ question }}</p>
        <div class="flip-card-band">
          <p class="flip-card-response">{{ response }}</p>
        </div>
      </div>
</template>

<style scoped>
  .flip-card {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 450px;
    height: 600px;
    color: #FFD7B2;
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
</style>
