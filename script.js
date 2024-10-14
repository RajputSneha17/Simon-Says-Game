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
        started = true; 
        button.innerText = "Playing...";
        levelUp(); 
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
    gameSeq.push(randColor);
    
    // Flash each button in sequence
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let randBtn = document.querySelector(`.${color}`);
            gameFlash(randBtn);
        }, index * 1000); // 1 second apart
    });
    
    calculateHighestScore(level);
}

function checkAns(idx) {
    if (!started) return;
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        alert(`Game Over!! \n Your Score: ${level}`);
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
        
        resetGame(); 
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
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
