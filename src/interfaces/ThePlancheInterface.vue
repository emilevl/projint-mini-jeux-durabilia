<script setup>
import { ref } from "vue";
import { transformers } from "../utils/store.js";
import ThePause from "../components/ThePause.vue";
import { computed } from "@vue/reactivity";
const CURRENT_TRANSFORMER = transformers.value.find((transformer) => transformer.name == "Scierie");

const pauseGame = ref(false);

let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 2000 },
            debug: true,
        },
    },
    input: {
        gamepad: true,
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    antialias: true,
};

// 250 300
const spawnPoint = { x: 10250, y: 300 };

// Death management
let deathCount = 0;
let playerDead = ref(false);
let deatCountdown = ref(0);

// Chrono management
let chronoStartTime;
let timeBeforePause = 0;
let chrono = ref();
let chronoDisplay = computed(() => {
    if (!pauseGame.value) {
        return formatTime(chrono.value);
    } else {
        return formatTime(timeBeforePause);
    }
});
let timer;

let player;

// Jump variables
let canDoubleJump = true;
let canJump = false;

let logs1;
let logs2;

let movingPlatform;

let cursors;
let bigSaws = [];
let bigSawsSpawnX = -150;
let movingSaws = [];
let saws = [];
let sawsCoordinates = [
    { x: 1472, y: 320, cut: 0 },
    { x: 2240, y: 448, cut: 0 },
    { x: 2560, y: 448, cut: 0 },
    { x: 5760, y: 832, cut: 0 },
    { x: 5952, y: 832, cut: 0 },
    { x: 6528, y: 1088, cut: 0 },
    { x: 6976, y: 960, cut: 0 },
    { x: 9152, y: 960, cut: 2 },
    { x: 10176, y: 1280, cut: 1 },
    { x: 10048, y: 1408, cut: 1 },
];

// Saws speed
const bigSawSpeed = 80;
const movingSawsSpeed = 80;

// Player attributes
const playerVelocity = 800;
let playerActualVelocity = 100;
const playerJumpVelocity = 600;

// Gamepad
let pad1;
let buttonControllerPressed = false;
let buttonControllerReleased = false;

// Audio
let bonk;

let game = new Phaser.Game(config);

function togglePauseGame() {
    if (pauseGame.value) {
        chronoStartTime = new Date();
    } else {
        timeBeforePause = chrono.value;
    }
    pauseGame.value = !pauseGame.value;
}

function preload() {
    // load the PNG file
    this.load.image("base_tiles", "assets/scierie/tiles/tiles.png");

    // load the JSON file
    this.load.tilemapTiledJSON("tilemap", "assets/scierie/tiles/map.json");

    // Load Player assets
    this.load.spritesheet("player", "assets/scierie/player.png", {
        frameWidth: 63.9,
        frameHeight: 57,
    });
    this.load.spritesheet("playerJump", "assets/scierie/playerJump.png", {
        frameWidth: 63.9,
        frameHeight: 69.7,
    });
    this.load.spritesheet("playerKilled", "assets/scierie/playerKilled.png", {
        frameWidth: 63.9,
        frameHeight: 57,
    });

    this.load.image("particle", "assets/scierie/particle.png");

    // Load control buttons
    //this.load.image('leftB', 'assets/leftButton.png');
    //this.load.image('RightB', 'assets/rightButton.png');

    // Load moving platform asset
    this.load.image("movingPlatform", "assets/scierie/platform.jpg");

    // Load log asset
    this.load.image("log", "assets/scierie/log.png");

    // Load saw assets
    this.load.image("bigSaw", "assets/scierie/bigSaw.png");
    this.load.image("littleSaw", "assets/scierie/littleSaw.png");
    this.load.image("saw", "assets/scierie/saw.png");

    // Load end machine
    this.load.image("endMachine", "assets/scierie/endMachine.png");

    // Audio
    this.load.audio("bonk", "assets/scierie/audio/bonk.mp3");
}

function create() {
    
    chronoStartTime = new Date();

    if (window.innerWidth <= 1050) {
        this.cameras.main.zoom = 0.6;
    }

    bonk = this.sound.add("bonk", { loop: false });

    this.cameras.main.setBounds(0, 0, 1000000, 100000);
    this.physics.world.setBounds(0, 0, 1000000, 100000);

    this.input.addPointer(1);

    this.physics.world.setFPS(120);

    // create the Tilemap
    const map = this.make.tilemap({ key: "tilemap" });

    // add the tileset image we are using
    const tileset = map.addTilesetImage("tiles-basic", "base_tiles");

    let bg = map.createDynamicLayer("bg", tileset);

    // "Platform" layer will be on top of "Background" layer
    let platform = map.createDynamicLayer("platform", tileset);
    platform.setCollisionByExclusion(-1, true);

    let saw = map.createDynamicLayer("saw", tileset);

    // The player and its settings
    player = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "player")
        .setCollideWorldBounds(true)
        .setBounce(0);

    //graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 } });

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: "left",
        frames: [{ key: "player", frame: 0 }],
        frameRate: 10,
    });

    this.anims.create({
        key: "turn",
        frames: [{ key: "player", frame: 1 }],
        frameRate: 20,
    });

    this.anims.create({
        key: "right",
        frames: [{ key: "player", frame: 1 }],
        frameRate: 10,
    });

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("playerJump", { start: 0, end: 11 }),
        frameRate: 81,
        repeat: 0,
    });

    this.anims.create({
        key: "jumpRight",
        frames: this.anims.generateFrameNumbers("playerJump", { start: 0, end: 11 }),
        frameRate: 81,
        repeat: 0,
    });

    this.anims.create({
        key: "jumpLeft",
        frames: this.anims.generateFrameNumbers("playerJump", { start: 12, end: 23 }),
        frameRate: 81,
        repeat: 0,
    });

    this.anims.create({
        key: "playerKilled",
        frames: this.anims.generateFrameNumbers("playerKilled", { start: 0, end: 6 }),
        frameRate: 120,
        repeat: 0,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Collide the player
    this.physics.add.collider(platform, player);

    movingPlatform = this.physics.add.image(2080, 470, "movingPlatform");
    movingPlatform.body.setAllowGravity(false).setGravity(0).setImmovable(true);
    movingPlatform.startPoint = 2080;
    movingPlatform.endPoint = 2400;
    // Add collide with moving platform and reset jump
    this.physics.add.collider(
        player,
        movingPlatform,
        () => {
            player.body.blocked.down = true;
        },
        null,
        this
    );

    // Death on saw touch
    saw.setCollisionByExclusion([-1]);
    this.physics.add.collider(player, saw, hitSaws, null, this);

    // Logs
    logs1 = this.physics.add.group();
    this.physics.add.collider(logs1, platform);
    this.physics.add.collider(player, logs1, hitLogs, null, this);

    logs2 = this.physics.add.group();
    this.physics.add.collider(logs2, platform);
    this.physics.add.collider(player, logs2, hitLogs, null, this);

    // Big saw
    for (let i = 0; i < 3; i++) {
        bigSaws[i] = this.physics.add.sprite(bigSawsSpawnX, (i + 1) * 400, "bigSaw").setScale(0.5);
        bigSaws[i].body.setAllowGravity(false);
        bigSaws[i].body.isCircle = true;
        bigSaws[i].setGravity(0).setImmovable(true).setVelocityX(bigSawSpeed);
    }

    bigSaws.forEach((bigSaw) => {
        this.physics.add.collider(player, bigSaw, hitSaws, null, this);
    });

    // Little saws
    movingSaws[0] = this.physics.add.sprite(3900, 1070, "littleSaw");
    movingSaws[0].startPoint = 3900;
    movingSaws[0].endPoint = 4600;

    movingSaws[1] = this.physics.add.sprite(4100, 870, "littleSaw");
    movingSaws[1].startPoint = 4100;
    movingSaws[1].endPoint = 4700;

    movingSaws.forEach((saw) => {
        saw.setScale(0.7);
        this.physics.add.collider(player, saw, hitSaws, null, this);
        saw.body.setAllowGravity(false);
        saw.body.isCircle = true;
        saw.setGravity(0).setImmovable(true).setVelocityX(0);
    });

    let graphics = this.add.graphics();
    graphics.fillStyle(0x00ff00, 0);

    // Fixed saws
    sawsCoordinates.forEach((co, i) => {
        saws[i] = this.physics.add.sprite(co.x, co.y, "saw");
        this.physics.add.collider(player, saws[i], hitSaws, null, this);
        saws[i].body.setAllowGravity(false).isCircle = true;
        saws[i].setGravity(0).setImmovable(true).setVelocityX(0);

        let rect, mask;
        switch (co.cut) {
            case 1:
                rect = graphics.fillRect(co.x-64, co.y-64, 64, 128);
                mask = rect.createGeometryMask();
                saws[i].setMask(mask);
                saws[i].setScale(0.9)
                break;
            case 2: 
                rect = graphics.fillRect(co.x, co.y-64, 64, 128);
                mask = rect.createGeometryMask();
                saws[i].setMask(mask);
                saws[i].setScale(0.9)
                break;
            default:
                break;
        }
    });

    // End machine
    let endMachine = this.physics.add.sprite(12900, 1400, "endMachine");
    endMachine.body.setAllowGravity(false);
    endMachine.setGravity(0).setImmovable(true).setVelocityX(0);
    this.physics.add.collider(player, endMachine, endGame, null, this);
    console.log(endMachine);

    player.depth = 10;

    // Camera
    this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
    this.cameras.main.startFollow(player);

    // Gamepad support
    this.input.gamepad.once("connected", function (pad) {
        //'pad' is a reference to the gamepad that was just connected
        pad1 = pad;
    });


    

}

function update() {
    if (pauseGame.value || playerDead.value) {
        this.physics.pause();
    } else {
        this.physics.resume();
    }

    let currentTime = new Date();
    chrono.value = currentTime - chronoStartTime + timeBeforePause;
    // Rotate the big saws
    bigSaws.forEach((bigSaw) => {
        bigSaw.rotation += 0.05;
    });

    // Rotate all other saws
    saws.forEach((saw) => {
        saw.rotation += 0.05;
    });

    // First phase of logs dropping
    if (player.x > 8800 && player.x < 9800) {
        //console.log(logs.children.entries[0]);
        if (logs1.children.size < 1) {
            let log = logs1.create(9250 + (Math.random(250) * (250 - 20) + 20), 300, "log");
            log.setBounce(0.2);
            log.setCollideWorldBounds(true);
            log.setMaxVelocity(0, 800);
        } else {
            logs1.children.entries.forEach((log) => {
                if (log.body.blocked.down) {
                    log.destroy();
                }
            });
        }
    }

    // Second phase of logs dropping
    if (player.x > 10400 && player.x < 12000) {
        //console.log(logs.children.entries[0]);
        if (logs2.children.size < 1) {
            let log = logs2.create(10600 + (Math.random(1200) * (1200 - 50) + 50), 600, "log");
            log.setBounce(0.2);
            log.setCollideWorldBounds(true);
            log.setMaxVelocity(0, Math.random(600) * (800 - 600) + 600);
        } else {
            logs2.children.entries.forEach((log) => {
                if (log.body.blocked.down) {
                    log.destroy();
                }
            });
        }
    }

    // Moving little saws
    movingSaws.forEach((saw) => {
        saw.rotation += 0.05;

        if (saw.x <= saw.startPoint) {
            saw.setVelocityX(movingSawsSpeed);
        } else if (saw.x >= saw.endPoint) {
            saw.setVelocityX(-movingSawsSpeed);
        }
    });

    // Moving plateform
    if (movingPlatform.x <= movingPlatform.startPoint) {
        movingPlatform.setVelocityX(movingSawsSpeed);
    } else if (movingPlatform.x >= movingPlatform.endPoint) {
        movingPlatform.setVelocityX(-movingSawsSpeed);
    }

    // Movements controls

    if (player.body.blocked.down) {
        canJump = true;
    }

    // DEBUG HELP (TO REMOVE LATER)
    if (cursors.up.isDown) {
        console.log(player);
    }

    if (cursors.left.isDown) {
        if (playerActualVelocity < playerVelocity) {
            playerActualVelocity += 50;
        }
        player.setVelocityX(-playerActualVelocity);
        if (player.body.blocked.down) {
            player.anims.play("left", true);
        }
    } else if (cursors.right.isDown) {
        if (playerActualVelocity < playerVelocity) {
            playerActualVelocity += 50;
        }
        player.setVelocityX(playerActualVelocity);
        if (player.body.blocked.down) {
            player.anims.play("right", true);
        }
    } else if (!this.input.pointer1.isDown && !this.input.pointer2.isDown) {
        playerActualVelocity = 0;
        player.setVelocityX(0);
        if (player.body.blocked.down) {
            player.anims.play("turn");
        }
    }

    // Jump
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
        if (!player.body.blocked.down && canJump) {
            canJump = false;
            player.setVelocityY(-playerJumpVelocity);
            player.anims.play("jump", true);
        }

        if (player.body.blocked.down) {
            canDoubleJump = true;
            player.setVelocityY(-playerJumpVelocity);
            player.anims.play("jump", true);
            if (cursors.right.isDown) {
                player.anims.play("jumpRight", true);
            }
            if (cursors.left.isDown) {
                player.anims.play("jumpLeft", true);
            }
        } else if (!player.body.blocked.down && canDoubleJump) {
            canDoubleJump = false;
            player.setVelocityY(-playerJumpVelocity);
            player.anims.play("jump", true);
            if (cursors.right.isDown) {
                player.anims.play("jumpRight", true);
            }
            if (cursors.left.isDown) {
                player.anims.play("jumpLeft", true);
            }
        }
    }

    // Mobile handeling of the jump
    if (this.input.pointer1.isDown || this.input.pointer2.isDown) {
        if (
            this.input.pointer1.position.x < game.config.width / 4 ||
            (this.input.pointer2.position.x < game.config.width / 4 &&
                this.input.pointer2.position.x > 0)
        ) {
            if (playerActualVelocity < playerVelocity) {
                playerActualVelocity += 50;
            }
            player.setVelocityX(-playerActualVelocity);
            if (player.body.blocked.down) {
                player.anims.play("left", true);
            }
        } else if (
            (this.input.pointer1.position.x > game.config.width / 4 &&
                this.input.pointer1.position.x < game.config.width / 2) ||
            (this.input.pointer2.position.x > game.config.width / 4 &&
                this.input.pointer2.position.x < game.config.width / 2)
        ) {
            if (playerActualVelocity < playerVelocity) {
                playerActualVelocity += 50;
            }
            player.setVelocityX(playerActualVelocity);
            if (player.body.blocked.down) {
                player.anims.play("right", true);
            }
        }

        if (
            (this.input.pointer1.justDown &&
                this.input.pointer1.position.x > game.config.width / 2) ||
            (this.input.pointer2.justDown && this.input.pointer2.position.x > game.config.width / 2)
        ) {
            if (player.body.blocked.down) {
                canDoubleJump = true;
                player.setVelocityY(-playerJumpVelocity);
            } else if (!player.body.blocked.down && canDoubleJump) {
                canDoubleJump = false;
                player.setVelocityY(-playerJumpVelocity);
            }
        }
    }

    // Gamepad controls
    if (pad1) {
        player.setVelocityX(playerVelocity * pad1.axes[0].getValue());

        if (player.body.blocked.down) {
            buttonControllerPressed = false;
        }

        if (pad1.buttons[0].pressed) {
            if (!player.body.blocked.down) {
                buttonControllerPressed = true;
            }

            if (!buttonControllerPressed) {
                player.setVelocityY(-playerJumpVelocity);
                buttonControllerPressed = true;
                canDoubleJump = true;
            } else if (buttonControllerReleased && canDoubleJump) {
                player.setVelocityY(-playerJumpVelocity);
                canDoubleJump = false;
            }

            buttonControllerReleased = false;
        } else if (!pad1.buttons[0].pressed) {
            buttonControllerReleased = true;
        }
    }
}

function formatTime(time) {
    let milliseconds = time % 1000;
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (60 * 1000)) % 60);
    let formatedTime =
        minutes.toString().padStart(2, "0") +
        "'" +
        seconds.toString().padStart(2, "0") +
        "'" +
        milliseconds.toString().padStart(3, "0");
    return formatedTime;
}

// Function to reset object location
function replaceObjects() {
    // Replace big saws
    bigSaws.forEach((bigSaw) => {
        bigSaw.x = bigSawsSpawnX;
    });

    // Replace moving platform
    movingPlatform.x = movingPlatform.startPoint;

    // Replace moving saws
    movingSaws.forEach((saw) => {
        saw.x = saw.startPoint;
    });
}

// Function to handle player hitted by a log
function hitLogs(player, log) {
    bonk.play();
    this.physics.pause();

    deathCount++;
    chronoStartTime = new Date();
    timeBeforePause = 0
    //deathCountText.setText('Death: ' + deathCount);

    player.setPosition(spawnPoint.x, spawnPoint.y);
    replaceObjects();
    log.destroy();

    this.physics.resume();
}

// Function to handle if the player hits a saw
async function hitSaws(player, saw) {
    playerDead.value = true;
    this.physics.pause();
    player.anims.play("playerKilled", false);

    deathCount++;

    await delay(200);
    chronoStartTime = new Date();
    timeBeforePause = 0

    player.setPosition(spawnPoint.x, spawnPoint.y);
    replaceObjects();

    playerDead.value = false;
    this.physics.resume();

    /* setInterval(function () {
        console.log("test");
    }, 3000);
    */
}

function endGame(player, endMachine) {
    // Stop physics and controls
    this.physics.pause();
    this.input.enabled = false;

    // Stop chrono
    timer.paused = true;
    const finalTime = formatTime(chrono.value);

    console.log(finalTime);
}

/* setInterval(function () {
        console.log("test");
}, 1000); */

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
</script>

<template>
    <!-- <h1>Planche</h1> -->
    <!-- <h1 id="chrono">00'00</h1> -->
    <h1 to="/" class="pause-game" @click="togglePauseGame()">Menu</h1>
    <ThePause
        v-if="pauseGame"
        :transformer="CURRENT_TRANSFORMER"
        @resumeGame="togglePauseGame"
    ></ThePause>
    <h1 id="chrono">{{ chronoDisplay }}</h1>
    <h2 v-if="playerDead" id="death-message">Touché</h2>
</template>

<style scoped>
body {
    margin: 0;
}
h1,
h2 {
    position: absolute;
    left: 1rem;
    font-family: "Limelight", cursive;
    font-size: 2.5rem;
}
.pause-game {
    position: absolute;
    max-width: 2rem;
    top: 10px;
    right: 1rem;
    left: auto;
    margin: 0 8rem 0 0;
    cursor: pointer;
}

#death-message {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 3rem;
}
</style>
