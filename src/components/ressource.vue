<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: String,
    level: Number,
    url: String
})

</script>

<template>
    <img class="back" :src=url>
</template>

<style scoped>
</style>