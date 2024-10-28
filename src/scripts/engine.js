const state = {
view: {
squares: document.querySelectorAll(".square"),
enemy: document.querySelector(".enemy"),
timeLeft: document.querySelector("#timeLeft"),
lifeLeft: document.querySelector("#lifeLeft"),
score: document.querySelector ("#score"),
},
values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 20,
  
},
actions:{
    countDownTimerId: setInterval(countDown, 1000),
}
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0){
        playSound("gameOver");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu resultado foi de: " + state.values.result);
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
});

let randomNumber = Math.floor(Math.random() * 9);
let randomSquare = state.view.squares[randomNumber];
randomSquare.classList.add("enemy");
state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', ()=>{
        if (square.id === state.values.hitPosition){
            state.values.result++
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hitCoin");
            }
        });   
    });
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();


