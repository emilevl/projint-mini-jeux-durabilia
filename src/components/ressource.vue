<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: String,
    level: Number,
    url: String
})

let percentage = ref(parseInt(props.level) + 2)
</script>

<template>
    <h1>{{ name }}</h1>
    <img :src=url>
</template>

<style scoped>

</style>