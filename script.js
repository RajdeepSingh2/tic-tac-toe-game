const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const themeToggle = document.getElementById('theme-toggle');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let xWins = 0, oWins = 0, draws = 0;
let playerNames = { X: 'X', O: 'O' };

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  const nameX = document.getElementById('playerX').value.trim();
  const nameO = document.getElementById('playerO').value.trim();
  if (nameX) playerNames.X = nameX;
  if (nameO) playerNames.O = nameO;

  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  resultScreen.style.display = 'none';
  statusEl.textContent = `Current turn: ${playerNames[currentPlayer]}`;
  renderBoard();
}

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = val;
    if (!val && !gameOver) {
      cell.addEventListener('click', () => handleMove(i));
    }
    boardEl.appendChild(cell);
  });
}

function handleMove(index) {
  if (board[index] || gameOver) return;
  board[index] = currentPlayer;
  renderBoard();

  const winningCombo = getWinningCombo(currentPlayer);
  if (winningCombo) {
    highlightWin(winningCombo);
    showResult(`${playerNames[currentPlayer]} wins!`);
    updateScore(currentPlayer);
    gameOver = true;
  } else if (board.every(cell => cell)) {
    showResult("It's a draw!");
    draws++;
    updateScore();
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Current turn: ${playerNames[currentPlayer]}`;
  }
}

function getWinningCombo(player) {
  return winningCombos.find(combo =>
    combo.every(i => board[i] === player)
  );
}

function highlightWin(combo) {
  const cells = document.querySelectorAll('.cell');
  combo.forEach(i => cells[i].classList.add('win'));
}

function showResult(message) {
  resultMessage.textContent = message;
  resultScreen.style.display = 'flex';
}

function updateScore(winner) {
  if (winner === 'X') xWins++;
  else if (winner === 'O') oWins++;
  document.getElementById('x-score').textContent = `X: ${xWins}`;
  document.getElementById('o-score').textContent = `O: ${oWins}`;
  document.getElementById('draws').textContent = `Draws: ${draws}`;
}

function resetGame() {
  xWins = 0;
  oWins = 0;
  draws = 0;
  playerNames = { X: 'X', O: 'O' };
  document.getElementById('playerX').value = '';
  document.getElementById('playerO').value = '';
  document.getElementById('x-score').textContent = 'X: 0';
  document.getElementById('o-score').textContent = 'O: 0';
  document.getElementById('draws').textContent = 'Draws: 0';
  resultScreen.style.display = 'none';
  statusEl.textContent = 'Enter player names to begin';
  boardEl.innerHTML = '';
  board = Array(9).fill('');
  gameOver = false;
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Start game initially
startGame();