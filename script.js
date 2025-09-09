document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell-index]');
    const gameStatus = document.getElementById('gameStatus');
    const restartButton = document.getElementById('restartButton');

    let isGameActive = true;
    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;


    function initializeGame() {
        gameStatus.textContent = currentPlayerTurn();
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
        restartButton.addEventListener('click', handleRestartGame);
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !isGameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase()); 
    }

    function handleResultValidation() {
        let roundWon = false;
        let winningCombination = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue; 
            }
            if (a === b && b === c) {
                roundWon = true;
                winningCombination = winCondition;
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = winningMessage();
            isGameActive = false;
            winningCombination.forEach(index => {
                cells[index].classList.add('winning');
            });
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            gameStatus.textContent = drawMessage();
            isGameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = currentPlayerTurn();
    }

    function handleRestartGame() {
        isGameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameStatus.textContent = currentPlayerTurn();
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o', 'winning');
        });
    }

    initializeGame();
});