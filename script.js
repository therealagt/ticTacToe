const TicTacToe = (function() {

const Gameboard = {
    columns: 3,
    rows: 3,
    board: [null, null, null, null, null, null, null, null, null],
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
let playerOneScore = 0;
let playerTwoScore = 0;

function gameStart() {
    Gameboard.board = [null, null, null, null, null, null, null, null, null];
    currentPlayer = Math.random() < 0.5 ? playerOne : playerTwo;
    gameOver = false;
    console.log(`Game started! ${currentPlayer.name} (${currentPlayer.token}) goes first.`);
    displayGameBoard();
}

function makeMove(pos, token) {
    if (Gameboard.board[pos] === null) {
        Gameboard.board[pos] = token;
        return true;
    } else {
        alert("Choose a different spot");
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

function switchMove(pos) {
    if (gameOver) {
        alert("Game is over! Start a new game.")
        return;
    }
    if (makeMove(pos, currentPlayer.token)) {
        const winner = checkMove();
        if (winner) {
            endGame(winner);
            return true 
        } else {
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        }
    } else {
        alert("Invalid move!")
    }
    }

function endGame(winner) {
    gameOver = true;
    if (winner === playerOne.token) playerOneScore++;
    if (winner === playerTwo.token) playerTwoScore++;
    console.log(`Game is over. Winner: ${winner}`);
    console.log(`Scores - X: ${playerOneScore}, 0: ${playerTwoScore}`);
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

return {
    start: gameStart,
    move: makeMove,
    check: checkMove,
    switch: switchMove,
    display: displayGameBoard
    };
})();