const colours = ["red", "blue", "yellow", "green"];

let randomChoosenPattern = [];
let userChoosenPattern = [];

const selectedColour = document.querySelectorAll(".btn");
const title = document.getElementById("level-title");

let started = false;
let level = 0;

// Play animation and sound while keypress
document.addEventListener("keydown", function(){
    if(!started){
        nextLevel();
        started = true;
    }
});

// Play animation sound while click
for (let i = 0; i < selectedColour.length; i++) {
    selectedColour[i].addEventListener("click", function () {
        const choosenColour = this.id;
        userChoosenPattern.push(choosenColour);
        buttonAnimate(choosenColour);
        playSound(choosenColour);
        checkAnswer(userChoosenPattern.length - 1);
    });
}

// checkAnswer
function checkAnswer(level){
    if(randomChoosenPattern[level] === userChoosenPattern[level]){
        if(randomChoosenPattern.length === userChoosenPattern.length){
            setTimeout(() => {
                nextLevel();
            }, 1000);
        }
    }else{
        title.innerHTML = "Game Over, Press any key to start again.";
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);
        playSound("wrong");
        gameover();
    }
}

// nextLevel
function nextLevel(){
    userChoosenPattern = [];
    level++;
    title.innerHTML = "Level " + level;

    const randomColour = colours[Math.floor(Math.random() * 4)];
    randomChoosenPattern.push(randomColour);

    randomChoosenPattern.forEach(function(eachItem, i){
        setTimeout(() => {
            buttonAnimate(eachItem);
            playSound(eachItem);
        }, i*500);
    });
}

// Button Animate While Press
function buttonAnimate(colourName) {
    document.getElementById(colourName).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(colourName).classList.remove("pressed");
    }, 200);
}

// Play sound while press
function playSound(colourName) {
    const audio = new Audio("sounds/" + colourName + ".mp3");
    audio.play();
}

// GameOver
function gameover(){
    level = 0;
    started = false;
    randomChoosenPattern = [];
}