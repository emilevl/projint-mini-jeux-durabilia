<script setup>
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faArrowLeft, faUserSecret } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faArrowLeft)

</script>


<template>
    <div class="main-page">
      <p to="/" class="back-link"><font-awesome-icon icon="fa-solid fa-arrow-left" />  Retour au campement</p>
      <div class="bottom-text">La forêt</div>
      
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
  