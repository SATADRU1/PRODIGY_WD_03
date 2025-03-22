class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.statusDisplay = document.getElementById('status');
        this.cells = document.querySelectorAll('.cell');
        this.restartButton = document.getElementById('restartButton');

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(cell, index));
        });

        this.restartButton.addEventListener('click', () => this.handleRestartGame());
    }

    handleCellClick(cell, index) {
        if (this.gameState[index] !== '' || !this.gameActive) {
            return;
        }

        this.updateCell(cell, index);
        this.handleResultValidation();
    }

    updateCell(cell, index) {
        this.gameState[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
    }

    handleResultValidation() {
        let roundWon = false;

        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            const position1 = this.gameState[a];
            const position2 = this.gameState[b];
            const position3 = this.gameState[c];

            if (position1 === '' || position2 === '' || position3 === '') {
                continue;
            }

            if (position1 === position2 && position2 === position3) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            this.statusDisplay.textContent = `Player ${this.currentPlayer} has won!`;
            this.gameActive = false;
            return;
        }

        const roundDraw = !this.gameState.includes('');
        if (roundDraw) {
            this.statusDisplay.textContent = 'Game ended in a draw!';
            this.gameActive = false;
            return;
        }

        this.handlePlayerChange();
    }

    handlePlayerChange() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
    }

    handleRestartGame() {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 