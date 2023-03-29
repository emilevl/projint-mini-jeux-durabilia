<script setup>

</script>


<template>
    <div class="main-page">
      <router-link to="/" class="back-link">Back</router-link>
      <div class="bottom-text">Small text on the bottom left corner</div>
      <router-view />
    </div>
  </template>
  
  <style>
    .main-page {
      /* Add styles here */
    }
    
    .back-link {
        position: absolute;
        top: 0;
        left: 0;
        margin: 20px;
    }
    
    .bottom-text {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 20px;
    }
  </style>
  