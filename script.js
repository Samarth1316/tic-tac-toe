let currentPlayer = 'X';
let gameBoard = [];
let gameOver = false;

// Initialize game board
for (let i = 0; i < 9; i++) {
    gameBoard.push('');
    document.getElementById(`cell-${i}`).addEventListener('click', handleCellClick);
}

// Handle cell click
function handleCellClick(event) {
    if (gameOver) return;
    const cellId = event.target.id;
    const cellIndex = parseInt(cellId.replace('cell-', ''));
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        document.getElementById(cellId).innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('turn').innerText = `Player ${currentPlayer}'s turn`;
    }
}

// Check for winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoard[combination[0]] === gameBoard[combination[1]] && gameBoard[combination[1]] === gameBoard[combination[2]] && gameBoard[combination[0]] !== '') {
            gameOver = true;
            document.getElementById('result').innerText = `Player ${gameBoard[combination[0]]} wins!`;
            return;
        }
    }
    // Check for tie
    if (!gameBoard.includes('')) {
        gameOver = true;
        document.getElementById('result').innerText = 'It\'s a tie!';
    }
}

// Reset game
document.getElementById('reset').addEventListener('click', function() {
    gameOver = false;
    currentPlayer = 'X';
    gameBoard = [];
    for (let i = 0; i < 9; i++) {
        gameBoard.push('');
        document.getElementById(`cell-${i}`).innerText = '';
    }
    document.getElementById('turn').innerText = `Player X's turn`;
    document.getElementById('result').innerText = '';
});