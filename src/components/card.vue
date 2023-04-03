<script setup>
import { onMounted } from 'vue';
import anime from 'animejs/lib/anime.es.js';


defineProps({
  name: String,
  description: String,
  index: Number
})

onMounted(() => {
    anime({
        targets: '.flip-card .flip-card-inner',
        keyframes: [
            {translateY: ['500', '0']},
            {rotateY: 180}
        ],
        duration: 1000,
        delay: anime.stagger(500),
        easing: 'spring(1, 80, 10, 0)'
        
    });
})

</script>


<template>
  <div class="flip-card"  :style="{
    transform: 'translate(-50%, calc(-50% + ' + (15 * index) + 'px)) scale(' + (1 - index * 0.01) + ')'
  }">
  <div class="flip-card-inner">
    <div class="flip-card-front"></div>
    <div class="flip-card-back">
      <h1>{{name}}</h1> 
      <p>{{description}}</p> 
    </div>
  </div>
</div>
</template>

<style scoped>
.flip-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(64vh * 0.64);
  max-width: 480px;
  max-height: 750px;
  height: 64vh;
  border: 1px solid black;
}

@media (max-width: 767px) {
  /* Apply different styles for small screens */
  .flip-card {
    width: calc(90vh * 0.64);
    height: 45vh;
  }
}

@media (max-width: 479px) {
  /* Apply different styles for very small screens */
  .flip-card {
    width: calc(100vw - 20px);
    height: 40vh;
  }
}
/* .flip-card {
  background-color: transparent;
  width: 10vw;
  height: 290px;
  perspective: 1000px;
  transition: transform 330ms ease-in-out;
  cursor: pointer;
} */

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 16px;
  
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 16px;
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
  background-color: #fff;
  color: #000;
  transform: rotateY(180deg);
}

/* .flip-card:hover {
  transform: scale(1.15);
} */
</style>
