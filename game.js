
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCounter = 0;
let attemptCounter = 0;
const matchCounterElement = document.getElementById('matches');
const attemptCounterElement = document.getElementById('attempts');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
shuffleCards();

restartButton.addEventListener('click', restartGame);


cards.forEach(card => card.addEventListener('click', flipCard));

function restartGame() {

    matchCounter = 0;
    attemptCounter = 0;
    matchCounterElement.textContent = `${matchCounter}`;
    attemptCounterElement.textContent = `${attemptCounter}`;
    messageElement.style.display = 'none'; 

   
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard); 
    });

   
    shuffleCards();
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    updateAttempts();
    checkForMatch();
}

function updateAttempts() {
    attemptCounter++;
    attemptCounterElement.textContent = `${attemptCounter}`;
    checkGameOver();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;
    if (isMatch) {
        disableCards();
        updateMatchCounter();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function updateMatchCounter() {
    matchCounter++;
    matchCounterElement.textContent = `${matchCounter}`;
    checkGameOver();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function checkGameOver() {
    if (matchCounter === 6) {
        messageElement.textContent = 'YOU WON!'; 
        messageElement.style.display = 'block'; 
        lockBoard = true; 
    } else if (attemptCounter === 10 && matchCounter < 6) {
        messageElement.textContent = 'YOU LOST!'; 
        messageElement.style.display = 'block'; 
        lockBoard = true; 
    }
}
