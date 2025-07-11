const symbols = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍋', '🥝'];
let cards = [...symbols, ...symbols];
let lockBoard = false;
let moves = 0;
let matches = 0;
let timer;
let seconds = 0;
let gameStarted = false;

const board = document.getElementById('game-board');
const moveCounter = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const starsDisplay = document.getElementById('stars');
const scoreDisplay = document.getElementById('score');


function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = seconds;
  }, 1000);
}
function updateStars() {
  if (moves <= 12) {
    starsDisplay.textContent = "⭐⭐⭐";
  } else if (moves <= 18) {
    starsDisplay.textContent = "⭐⭐";
  } else {
    starsDisplay.textContent = "⭐";
  }
}
function restartGame() {
  cards = shuffle([...symbols, ...symbols]);
  board.innerHTML = '';
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
  moves = 0;
  matches = 0;
  seconds = 0;
  gameStarted = false;
  clearInterval(timer);
  moveCounter.textContent = moves;
  timerDisplay.textContent = seconds;
  starsDisplay.textContent = "⭐⭐⭐";

  createBoard();
}
function createBoard() {
  cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="inner-card">
        <div class="front"></div>
        <div class="back">${symbol}</div>
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}
function flipCard(card) {
  if (lockBoard || card === firstCard || card.querySelector('.inner-card').classList.contains('flipped')) return;

  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  const inner = card.querySelector('.inner-card');
  inner.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  moves++;
  moveCounter.textContent = moves;
  updateStars();

  const firstSymbol = firstCard.querySelector('.back').textContent;
  const secondSymbol = secondCard.querySelector('.back').textContent;

  if (firstSymbol === secondSymbol) {
    matches++;
    resetTurn();

    if (matches === symbols.length) {
      clearInterval(timer);
      alert(`🎉 You won in ${moves} moves and ${seconds} seconds!`);
    }

  } else {
    setTimeout(() => {
      firstCard.querySelector('.inner-card').classList.remove('flipped');
      secondCard.querySelector('.inner-card').classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartGame();
