/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying){
    // anounymous function, which does not have a name and cannot be reused.
    // 1. Once the button is clicked we need to generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    // to set a random value to a particular id
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3.Update the round score IF the rolled number was NOT 1
    if (dice !== 1) {
        // add the score
        roundScore = roundScore + dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
}
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
    // add the current score to the global scrollBehavior:
    score[activePlayer] = score[activePlayer] + roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent =
        score[activePlayer];

    // check if the player won the game
    if (score[activePlayer] >= 10) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner !!!';
        document.querySelector('.dice').style.display = 'none';
        document
            .querySelector('.player-' + activePlayer + '-panel')
            .classList.add('winner');
        document
            .querySelector('.player-' + activePlayer + '-panel')
            .classList.remove('active');
            gamePlaying = false;
    } else {
        // switch player
        nextPlayer();
    }
}
});

function nextPlayer() {
    // Next Player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // < -- ternary operator
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // change the css of a particular element
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
