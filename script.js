const gameboard = document.getElementById("game-board");
const turnDisplay = document.getElementById("turn");
const score1Display = document.getElementById("score1");
const score2Display = document.getElementById("score2");

let cardsArray = [
  "images/anaconda.png",
  "images/anaconda.png",
  "images/bee.png",
  "images/bee.png",
  "images/chameleon.png",
  "images/chameleon.png",

  "images/gorilla.png",
  "images/gorilla.png",
  "images/macaw.png",
  "images/macaw.png",
  "images/piranha.png",
  "images/piranha.png",
  "images/sloth.png",
  "images/sloth.png",
  "images/tiger.png",
  "images/tiger.png",
];

let firstCard = null;
let secondCard = null;
let turn = 1;
let score1 = 0;
let score2 = 0;
let lockBoard = false;

// start point
createBoard();

//  to shuffle cards randommly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// creating the game board
function createBoard() {
  shuffle(cardsArray);

  cardsArray.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.symbol = image;
    card.addEventListener("click", flipCard);
    gameboard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");
  this.style.backgroundImage = `url(${this.dataset.symbol})`;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    disableCards();
    updateScores();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.style.backgroundImage = "";
    secondCard.style.backgroundImage = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
  switchTurn();
}

function switchTurn() {
  turn = turn === 1 ? 2 : 1;
  turnDisplay.textContent = `Player ${turn}`;
}

function updateScores() {
  if (turn === 1) {
    score1++;
    score1Display.textContent = score1;
  } else {
    score2++;
    score2Display.textContent = score2;
  }

  if (score1 + score2 === cardsArray.length / 2) {
    setTimeout(() => {
      announceWinner();
    }, 500);
  }
}

function announceWinner() {
  if (score1 > score2) {
    alert(`Game Over! Player 1 Wins: ${score1} - Player 2: ${score2} `);
  } else if (score2 > score1) {
    alert(`Game Over! Player 2 Wins: ${score2} - Player 1: ${score1}`);
  } else {
    alert(`It's a Tie! Player 1: ${score1} - Player 2: ${score2}`);
  }
  resetGame();
}

function resetGame() {
  gameboard.innerHTML = "";
  [score1, score2, turn] = [0, 0, 1];
  score1Display.textContent = score1;
  score2Display.textContent = score2;
  turnDisplay.textContent = `Player ${turn}`;
  createBoard();
}
