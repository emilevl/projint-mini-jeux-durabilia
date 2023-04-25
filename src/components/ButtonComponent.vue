<script setup>
</script>

<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    all: unset;
    font-size: 1.2em;
    padding: 10px 20px;
    font-family: 'Urbanist', 'Inter', sans-serif;
    cursor: pointer;
    transition: 0.3s;
    text-align: center;
}

@media screen and (max-width: 1050px) {
    button {
        font-size: 1em;
        padding: 5px 10px;
        background-color: black;
        color: #FBF8F1;
        border-radius: 10px 0px;
    }
}

button:hover {
        background-color: black;
        color: #FBF8F1;
        border-radius: 10px 0px;
        transition: 0.3s;
    }

@media screen and (min-width: 1050px) {
    button:hover {
        background-color: black;
        color: #FBF8F1;
        border-radius: 20px 0px;
        transition: 0.3s;
    }
}
</style>