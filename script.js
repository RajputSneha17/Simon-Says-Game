let gameSeq = [];
let userSeq = [];
let highestScore = 0;
let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");
let button = document.querySelector(".start");

button.addEventListener("click", function () {
    if (!started) {
        button.innerText = "Restart";
        started = true;
        levelUp();
    } else {
        resetGame();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    if (!started) return;
    
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
    
    gameFlash(randBtn);
    calculateHighestScore(level);
}

function checkAns(idx) {
    if (!started) return;

    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 1 }
        });
        button.innerText = "Restart";
        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "lightgoldenrodyellow";
        }, 150);
        alert(`Game Over!! \n Your Score: ${level}`);
        
        resetGame();
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    button.innerText = "Start Game";
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    highestScore = 0;
    updateHighestScore();
}

function calculateHighestScore(score) {
    highestScore = Math.max(highestScore, score);
    updateHighestScore();
}

function updateHighestScore() {
    h3.innerText = `Level: ${level} | Highest Score: ${highestScore}`;
}

updateHighestScore();
document.getElementById("confettiButton").addEventListener("click", function() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 1 }
    });
});
