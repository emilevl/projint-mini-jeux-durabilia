<script setup>
import { ref } from 'vue';

const props = defineProps({
    ressourcesImpacted: Array
})

const emit = defineEmits([
    'closeRecap',
]);

</script>

<template>
    <div class="background" @click="$emit('closeRecap')"></div>
    <div class="recap-container">
        <h1 class="title">Recap</h1>
    </div>
</template>

<style scoped>
.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 50%;
}

.recap-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: white;
}
</style>