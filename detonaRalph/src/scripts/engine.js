const state ={
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        timerId: null,
        //timerId: setInterval(randomSquare, 1000),
        // usando essa chamada aqui accabaria a funcao moveEnemy e ela nao seria chamada em initiaçize, e elas seriam separadas nas actions **
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    //** 
    //actions: {
        //timerId: setInterval(randomSquare, 1000),
        //countDownTimerId: setInterval(countDown, 1000),
    //},
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        //clearInterval(state.countDownTimerId);
        //clearInterval(state.timerId);
        alert("Game Over! O seu resultado foi: "+ state.values.result);
    }
};

function playSound(audioName){
    //audio.volume =0.5;
    //para ter varios audios
    let audio = new Audio('./src/audios/${audioName}.m4a');
    audio.play();
}
/*function playSound(){
    //audio.volume =0.5;
    let audio = new Audio("./src/audios/hit.m4a");
    audio.play();
}*/

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
};

// alguns lugares chamam de main()
function initialize(){
    moveEnemy();
    addListenerHitbox();
};

initialize();