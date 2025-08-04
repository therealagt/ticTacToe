const TicTacToe = (function() {

const Gameboard = {
    board: Array(9).fill(null),
}

const playerOne = { token: "X", score: 0, name: "Player 1" };
const playerTwo = { token: "0", score: 0, name: "Player 2" };
const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer;
let gameOver = false; 

function gameStart() {
    Gameboard.board = [null, null, null, null, null, null, null, null, null];
    currentPlayer = Math.random() < 0.5 ? playerOne : playerTwo;
    gameOver = false;
    updateDisplay();
    updateScoreDisplay();

    alert(`Game started! ${currentPlayer.name} (${currentPlayer.token}) goes first.`);
    displayGameBoard();
}

function makeMove(pos, token) {
    if (Gameboard.board[pos] === null) {
        Gameboard.board[pos] = token;
        return true;
    } else {
        return false;
    }
}

function checkMove() {
    for (let combo of winCombo) {
        const [a, b, c] = combo;
        if (Gameboard.board[a] !== null &&
            Gameboard.board[a] === Gameboard.board[b] &&
            Gameboard.board[a] === Gameboard.board[c]
        ) {
            return Gameboard.board[a];
        }
    }
    if (Gameboard.board.every(cell => cell !== null)) {
        return "tie";
    }

    return null;
}

function updateDisplay() {
    for (let i = 0; i < 9; i++) {
        const cell = document.querySelector(`[data-index="${i}"]`);
        if (cell) {
            cell.textContent = Gameboard.board[i] || '';
        }
    }
}
function switchMove(pos) {
    if (gameOver) {
        return;
    }
    if (makeMove(pos, currentPlayer.token)) {
        updateDisplay();
        const winner = checkMove();
        if (winner) {
            endGame(winner);
            return true 
        } else {
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        }
    } else {
    }
    }

function endGame(winner) {
    gameOver = true;
    if (winner === playerOne.token) playerOne.score++;
    if (winner === playerTwo.token) playerTwo.score++;

    updateScoreDisplay();

    console.log(`Game is over. Winner: ${winner}`);
    console.log(`Scores - X: ${playerOne.score}, 0: ${playerTwo.score}`);

    if (winner === "tie") {
        alert("It's a tie!");
    } else {
        alert(`${winner} wins!`);
    }
}

function updateScoreDisplay() {
    const playerOneScoreElement = document.querySelector('#player-one-score');
    const playerTwoScoreElement = document.querySelector('#player-two-score');
    const playerOneLabel = document.querySelector('#player-one-label');
    const playerTwoLabel = document.querySelector('#player-two-label');
    if (playerOneLabel) playerOneLabel.textContent = playerOne.name;
    if (playerTwoLabel) playerTwoLabel.textContent = playerTwo.name;
    if (playerOneScoreElement) playerOneScoreElement.textContent = playerOne.score;
    if (playerTwoScoreElement) playerTwoScoreElement.textContent = playerTwo.score;
}
function displayGameBoard() {
    for (let i = 0; i < 9; i += 3) {
        console.log(
            [Gameboard.board[i], Gameboard.board[i+1], Gameboard.board[i+2]]
            .map(cell => cell === null ? "." : cell)
            .join("")
        );
    }
}

function makeNamesEditable() {
    document.querySelectorAll('.editable-name').forEach(label => {
        label.addEventListener('click', function handler() {
            const currentName = this.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'editable-name-input';
            input.value = currentName;
            input.size = Math.max(currentName.length, 6);
            this.replaceWith(input);
            input.focus();

            input.addEventListener('blur', finishEdit);
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') input.blur();
            });

            function finishEdit() {
                const newName = input.value.trim() || currentName;
                const span = document.createElement('span');
                span.className = 'editable-name';
                span.textContent = newName;
                input.replaceWith(span);

                if (label.id === 'player-one-label') {
                    playerOne.name = newName;
                } else {
                    playerTwo.name = newName;
                }
                updateScoreDisplay();
                span.addEventListener('click', handler);
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', makeNamesEditable);
} else {
    makeNamesEditable();
}

return {
    start: gameStart,
    move: makeMove,
    check: checkMove,
    switch: switchMove,
    display: displayGameBoard,
    updateScores: updateScoreDisplay,
    playerOne,
    playerTwo
};
})();