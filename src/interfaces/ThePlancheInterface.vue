<script setup>
import { ref } from "vue";
import { transformers } from "../utils/store.js";
import ThePause from "../components/ThePause.vue";
const CURRENT_TRANSFORMER = transformers.value.find((transformer) => transformer.name == "Scierie");

const pauseGame = ref(false);
function togglePauseGame() {
    console.log("pause");
    if (pauseGame.value) {
        // document.addEventListener("mousemove", mouseMoveHandler);
        // document.querySelector("#clickable-part").addEventListener("click", updateCardDecision);
        pauseGame.value = false;
    } else {
        // document.removeEventListener("mousemove", mouseMoveHandler);
        // document.querySelector("#clickable-part").removeEventListener("click", updateCardDecision);
        pauseGame.value = true;
    }
}

let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 2000 },
            debug: false,
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

// let chronoH1 = document.getElementById("chrono");

// 400 300
const spawnPoint = { x: 400, y: 300 };

let deathCount = 0;
let chrono = ref(0);
let timer;

let player;
let canDoubleJump = true;
let canJump = false;

let triangle;
let graphics;

let movingPlatform;

let cursors;
let bigSaw;
let bigSaws = [];
let movingSaws = [];
let saws = [];
let sawsCoordinates = [
    { x: 1472, y: 320 },
    { x: 2240, y: 448 },
    { x: 2560, y: 448 },
    { x: 5760, y: 832 },
    { x: 5952, y: 832 },
    { x: 6528, y: 1088 },
    { x: 6976, y: 960 },
];

let logs;
let logs2;

const bigSawSpeed = 100;
const movingSawsSpeed = 80;

const playerVelocity = 800;
let playerActualVelocity = 100;
const playerJumpVelocity = 600;

let pad1;

let game = new Phaser.Game(config);

function preload() {
    // load the PNG file
    this.load.image("base_tiles", "src/assets/scierie/tilesNew/tiles.png");

    // load the JSON file
    this.load.tilemapTiledJSON("tilemap", "src/assets/scierie/tilesNew/map.json");

    // Load Player assets
    this.load.spritesheet("player", "src/assets/scierie/playerNew.png", {
        frameWidth: 63.9,
        frameHeight: 57,
    });
    this.load.spritesheet("playerJump", "src/assets/scierie/playerJump.png", {
        frameWidth: 67,
        frameHeight: 57,
    });
    this.load.spritesheet("playerKilled", "src/assets/scierie/playerKilled.png", {
        frameWidth: 69,
        frameHeight: 69,
    });

    this.load.image("particle", "src/assets/scierie/particle.png");

    // Load control buttons
    //this.load.image('leftB', 'src/assets/scierie/leftButton.png');
    //this.load.image('RightB', 'src/assets/scierie/rightButton.png');

    // Load moving platform asset
    this.load.image("movingPlatform", "src/assets/scierie/platform.jpg");

    // Load log asset
    this.load.image("log", "src/assets/scierie/logNew.png");

    // Load saw assets
    this.load.image("bigSaw", "src/assets/scierie/bigSaw.png");
    this.load.image("littleSaw", "src/assets/scierie/littleSaw.png");
    this.load.image("saw", "src/assets/scierie/saw.png");
}

function create() {
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
        frames: [{ key: "player", frame: 2 }],
        frameRate: 20,
    });

    this.anims.create({
        key: "right",
        frames: [{ key: "player", frame: 4 }],
        frameRate: 10,
    });

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("playerJump", { start: 0, end: 9 }),
        frameRate: 81,
        repeat: 0,
    });

    this.anims.create({
        key: "jumpRight",
        frames: this.anims.generateFrameNumbers("playerJump", { start: 10, end: 19 }),
        frameRate: 81,
        repeat: 0,
    });

    this.anims.create({
        key: "jumpLeft",
        frames: this.anims.generateFrameNumbers("playerJump", { start: 20, end: 29 }),
        frameRate: 81,
        repeat: 0,
    });

    this.anims.create({
        key: "playerKilled",
        frames: this.anims.generateFrameNumbers("playerKilled", { start: 0, end: 4 }),
        frameRate: 20,
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
    logs = this.physics.add.group();
    this.physics.add.collider(logs, platform);
    this.physics.add.collider(player, logs, hitLogs, null, this);

    logs2 = this.physics.add.group();
    this.physics.add.collider(logs2, platform);
    this.physics.add.collider(player, logs2, hitLogs, null, this);

    // Big saw
    for (let i = 0; i < 3; i++) {
        bigSaws[i] = this.physics.add.sprite(0, (i + 1) * 400, "bigSaw").setScale(0.5);
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

    // Fixed saws
    sawsCoordinates.forEach((co, i) => {
        saws[i] = this.physics.add.sprite(co.x, co.y, "saw");
        this.physics.add.collider(player, saws[i], hitSaws, null, this);
        saws[i].body.setAllowGravity(false).isCircle = true;
        saws[i].setGravity(0).setImmovable(true).setVelocityX(0);
    });

    // Camera
    this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
    this.cameras.main.startFollow(player);

    timer = this.time.addEvent({
        delay: 1000,
        callback: addSecond,
        callbackScope: this,
        loop: true,
    });

    // Gamepad support
    //this.input.gamepad.start();
    //pad1 = game.input.gamepad;
    //console.log(this.input);
    this.input.gamepad.once("connected", function (pad) {
        //'pad' is a reference to the gamepad that was just connected
        pad1 = pad;
    });
}

function update() {
    // Rotate the big saw
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
        if (logs.children.size < 1) {
            let log = logs.create(9250 + (Math.random(250) * (250 - 20) + 20), 300, "log");
            log.setBounce(0.2);
            log.setCollideWorldBounds(true);
            log.setMaxVelocity(0, 800);
        } else {
            logs.children.entries.forEach((log) => {
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
    } else {
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
            player.setVelocityX(-playerVelocity);
            player.anims.play("left", true);
        } else if (
            (this.input.pointer1.position.x > game.config.width / 4 &&
                this.input.pointer1.position.x < game.config.width / 2) ||
            (this.input.pointer2.position.x > game.config.width / 4 &&
                this.input.pointer2.position.x < game.config.width / 2)
        ) {
            player.setVelocityX(playerVelocity);
            player.anims.play("right", true);
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
        if (pad1.buttons[0].value) {
            console.log(Phaser.Input.Gamepad.Gamepad);
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
    }
}

// function to increase the timer
function addSecond() {
    chrono.value++;
    // console.log(chrono.value)
    // chronoH1.innerHTML = formatTime(chrono);
}

// Function to format the time for the timer
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let formatedTime =
        minutes.toString().padStart(2, "0") + "'" + seconds.toString().padStart(2, "0");
    return formatedTime;
}

// Function to reset object location
function replaceObjects() {
    // Replace big saws
    bigSaws.forEach((bigSaw) => {
        bigSaw.x = 0;
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
    this.physics.pause();

    deathCount++;
    chrono.value = 0;
    //deathCountText.setText('Death: ' + deathCount);

    player.setPosition(spawnPoint.x, spawnPoint.y);
    replaceObjects();
    log.destroy();

    this.physics.resume();
}

// Function to handle if the player hits a saw
function hitSaws(player, saw) {
    this.physics.pause();
    chrono.value = 0;

    player.anims.play("playerKilled", true).once("animationcomplete", () => {
        player.setPosition(spawnPoint.x, spawnPoint.y);
        replaceObjects();

        this.physics.resume();
    });

    deathCount++;
}
</script>

<template>
    <!-- <h1>Planche</h1> -->
    <!-- <h1 id="chrono">00'00</h1> -->
    <h1 to="/" class="pause-game" @click="togglePauseGame()">
      Menu
    </h1>
    <ThePause
        v-if="pauseGame"
        :transformer="CURRENT_TRANSFORMER"
        @resumeGame="togglePauseGame"
    ></ThePause>
    <h1 id="chrono">{{ chrono }}</h1>
</template>

<style scoped>
body {
    margin: 0;
}
h1 {
    position: absolute;
    left: 1rem;
    font-family: "Limelight", cursive;
}
</style>
