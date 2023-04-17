<script setup>

const emit = defineEmits([
    'emitToggleRules',
]);

</script>

<template>
    <div class="background" @click="$emit('emitToggleRules')"></div>
    <div class="container">
        <img class="close-button" src="src/assets/icons/close.svg" @click="$emit('emitToggleRules')" />
        <h2>Tribunal</h2>

        <div class="rules-container">
            <h3>Règles</h3>
            <p class="rules-p">Prenez des décisions en balançant les cartes à gauche ou à droite. Ces décisions auront un
                petit ou un grand impact sur vos ressources. Vous aurez 5 choix à faire. Le 5ème choix affectera de manière
                plus conséquente vos ressources ou vos interactions sur la carte.</p>
            <div class="ressources-container">
                <div class="ressources-details">
                    <h3>Ressources nécessaires</h3>
                    <div class="ressources-progression">

                    </div>
                </div>
                <div class="ressources-details">
                    <h3>Ressources reçues</h3>
                    <div class="ressources-progression">
                        
                    </div>
                </div>
                <div class="ressources-details">
                    <h3>Conséquences</h3>
                    <div class="ressources-progression">

                    </div>
                    <div class="ressources-progression">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 600px;
    background-color: white;
    text-align: center;
    padding: 20px;
}

.close-button {
    cursor: pointer;
    position: absolute;
    left: 100%;
    transform: translate(-100%, 0);
    width: 40px;
    height: 40px;
    padding-right: 20px;
}

.rules-container {
    margin-top: 50px;
    text-align: left;
    padding-left: 50px;
    padding-right: 50px;
}

.ressources-container {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
}

.ressources-details {
    display: flex;
    flex-direction: column;
}

h3 {
    font-size: 1.5em;
}
</style>