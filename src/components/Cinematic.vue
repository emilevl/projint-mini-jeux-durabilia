<script setup>
import { onMounted, ref } from "vue";
import cinematic from "../assets/cinematics.json";
import { transformers } from "../utils/store";

const props = defineProps({
    transformer: String
})

const emit = defineEmits(["emitPlay"]);



/* const transformer = ref("Scierie"); */
const CURRENT_TRANSFORMER = transformers.value.find(
    (transfo) => transfo.name == props.transformer
);

const gameLaunched = ref(false);
const dialogOn = ref(false);
const currentCinematic = ref(cinematic.games[CURRENT_TRANSFORMER.cinematicIdx]);
const dialogIdx = ref(0);
const dialogTotalNb = ref(currentCinematic.value.dialogs.length);

// set images and text for the current dialog
const mobileImgExtension = ref('')
if (window.matchMedia("(max-width: 1050px)").matches) {
    mobileImgExtension.value = '-mobile';
}
const dialogBackground = ref(`bubble-${currentCinematic.value.dialogs[dialogIdx.value].character}`);
const dialogText = ref(currentCinematic.value.dialogs[dialogIdx.value].text);



setTimeout(() => {
    dialogOn.value = true;
}, 3000);

function nextDialog() {
    dialogBackground.value = 'bubble';
    dialogText.value = '';



    if (dialogIdx.value < dialogTotalNb.value - 1) {
        dialogIdx.value++;
    } else {
        gameLaunched.value = true;
        //emit play
        emit("emitPlay");
    }
    setTimeout(() => {
        dialogOn.value = true;
    }, 2000);

    function nextDialog() {
        dialogBackground.value = 'bubble';
        dialogText.value = '';

        
        
        if (dialogIdx.value < dialogTotalNb.value - 1) {
            dialogIdx.value++;
        } else {
            gameLaunched.value = true;
            //emit play
            emit("emitPlay");
        }
        setTimeout(() => {
            dialogBackground.value = `bubble-${currentCinematic.value.dialogs[dialogIdx.value].character}`;
            dialogText.value = currentCinematic.value.dialogs[dialogIdx.value].text;
        }, 250);
    }
}
//event listener on arrows keys to navigate through dialogs
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        nextDialog();
    }
    if (e.key == "ArrowLeft") {
        previousDialog();
    }

    // if key is "p"
    if (e.key == "p") {
        emit("emitPlay");
        gameLaunched.value = true;
    }
});

//event listener on click to navigate through dialogs
window.addEventListener("click", (e) => {
    nextDialog();
});

</script>

<template>
    <div :class="`cinematic ${dialogOn ? 'darken' : ''}`">
      <div class="background" :style="{ backgroundImage: 'url(/assets/cinematics/' + currentCinematic.background + mobileImgExtension + '.jpg)' }"></div>
      <div class="conversation" v-if="dialogOn">
        <div class="dialog" key="0" :style="{ backgroundImage: 'url(/assets/cinematics/' + dialogBackground + mobileImgExtension + '.jpg)' }">
            <transition name="fade">
             <p v-if="dialogText">{{ dialogText }}</p>
            </transition>
        </div>
        </div>
        <img :src="`/assets/cinematics/skip-button${mobileImgExtension}.jpg`" class="skip-button"
            v-if="dialogOn && dialogIdx > 0" @click="$emit('emitPlay')" />
    </div>
</template>
  
  
<style scoped>
.cinematic {
    width: 100%;
    height: 100%;
}

/* darken the background */
.darken {
    height: 100vh;
    width: 100vw;
    background-color: rgba(40, 40, 40, 0.35);
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: -1;
    background-color: black;
  }
  
  .conversation {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  .dialog {
    width: 750px;
    display: flex;
    flex-direction: column;
    height: 165px;
    background-size: cover;
    background-position: center;
    justify-content: center;
}

.dialog p {
    font-size: 1.5rem;
    font-family: "Urbanist", "Inter", sans-serif;
    margin: 0;
    color: white;
    padding: 10px;
    padding: 30px;
}

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .skip-button {
    position: absolute;
    bottom: 42px;
    right: 28px;
    width: 172px;
    cursor: pointer;
}
</style>
  