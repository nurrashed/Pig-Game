'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diseEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');

let scores, playing, currentScore, activePlayer;

//Starting condition

const init = function(){
    currentScore = 0;
    activePlayer = 0;
    scores = [0,0];
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;    
    currentScorePlayer0.innerText = 0;
    currentScorePlayer1.innerText = 0;    
    diseEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add ('player--active');
    player1El.classList.remove ('player--active');
};

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        //1. Generating a random dice roll
        const randomDice = Math.trunc(Math.random() * 6) + 1;
        console.log(randomDice);
    
        //2. Display dice
        diseEl.classList.remove('hidden');
        diseEl.src = `dice-${randomDice}.png`;
    
        //3. Check for rolled dice vale is 1. 
        if(randomDice != 1){
            //Add randomDice value to currentScorePlayer0
            currentScore += randomDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //currentScorePlayer0.textContent = currentScore;
        }else{
            //If it is 1 switch to the next player and add the randomDice value to currentScorePlayer1
            switchPlayer();
        }
    }
});

//Hold dice functionality
btnHold.addEventListener('click', function(){
    if(playing){
        //Add current score to active player score
        scores[activePlayer] += currentScore;
        console.log('hold button', scores[activePlayer]);
        console.log(scores);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //check if player's score is >= 100
        if(scores[activePlayer] >= 10){
            //Finish the game
            playing = false;
            diseEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        }else{
            //Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function(){
    init();
});


