<script setup>
import { ref } from 'vue'

defineProps({
  name: String,
  description: String
})


</script>

<template>
  <div class="card">
    <h1>{{ name }}</h1>
    <p> {{ description }} </p>
  </div>
</template>

<style scoped>
    .card {
        display: block;
        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: auto;
        align-self: auto;
        order: 0;

        background-color: #fff;

        width: 180px;
        height: 290px;

        border-radius: 16px;

        box-shadow:
            2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
            6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
            12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
            22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
            41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
            100px 100px 80px rgba(0, 0, 0, 0.07);
        
        color: #000;
    }

    h1 {

    }
</style>
