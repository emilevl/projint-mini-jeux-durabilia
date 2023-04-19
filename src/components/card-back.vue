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
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-box-shadow: 1px -1px 4px -1px rgba(0,0,0,0.7);
    -moz-box-shadow: 1px -1px 4px -1px rgba(0,0,0,0.7);
    box-shadow: 1px -1px 4px -1px rgba(0,0,0,0.7);
    color: #FFD7B2;
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
</style>
