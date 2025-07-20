//  accesss the js variable
let Gamesq= [];
let Usersq= [];
let level = 0;
let started = false;
let buttonColors = ["red", "yellow", "blue","green" ];
let h2= document.querySelector("h2");
let score = 0;
let highScore = 0;
let scoreValue = document.querySelector(".score-value");
let highScoreValue = document.querySelector(".high-score-value");

//  start button function
let startBtn = document.querySelector(".btn-start");
startBtn.addEventListener("click", function() {
    if (!started) {
        started = true;
        level = 0; // Reset level before starting
        Gamesq = [];
        Usersq = [];
        h2.innerText = `level ${level + 1}`;
        levelUp();
    }
});

// random game flash blink when the game start thenn its blink 
function gameflash(btn) {
	btn.classList.add("flash");
	setTimeout(function() {
		btn.classList.remove("flash");
	}, 200);
}

// user input game flash   user input 
function userflash(btn){
	btn.classList.add("userflash")
	setTimeout(function(){
		btn.classList.remove("userflash")
	},200);
}

// level upgrade work
function levelUp() {
    Usersq = [];
    level++;
    score += 100; // Add 100 points for each correct sequence
    if (score > highScore) {
        highScore = score;
        highScoreValue.innerText = highScore;
    }
    scoreValue.innerText = score;
    h2.innerText = `level ${level}` ;
    let randmindx = Math.floor(Math.random() * buttonColors.length);
    let randomChosenColor = buttonColors[randmindx];
	let randbtn = document.querySelector(`.${randomChosenColor}`);
 Gamesq.push(randomChosenColor)
 console.log(Gamesq)
	gameflash(randbtn);
};

function CheckAnswer(idx) {
    // check the user input and game input is same or not
    if (Usersq[idx] === Gamesq[idx]) {
        if (Usersq.length === Gamesq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = "Game Over, Press Start to Restart";
        reset();
    }
}

//   its manage the data of gamesq and 
function btnPress() {
    if (!started) return; // Prevent pressing when not started
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    Usersq.push(userColor);
    CheckAnswer(Usersq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    Gamesq = [];
    Usersq = [];
    level = 0;
    if (score > highScore) {
        highScore = score;
        highScoreValue.innerText = highScore;
    }
    score = 0;
    scoreValue.innerText = score;
    h2.innerText = " Game Over! , Press Start to Play Again";
}