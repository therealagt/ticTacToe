const TicTacToe = (function() {

const Gameboard = {
    columns: 3,
    rows: 3,
    board: [null, null, null, null, null, null, null, null, null],
}

const playerOneToken = `X`;
const playerTwoToken = `0`;
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
    currentPlayer = Math.random() < 0.5 ? playerOneToken : playerTwoToken;
    console.log(`Game started! ${currentPlayer} goes first.`);
}

function makeMove(pos, playerToken) {
    if (Gameboard.board[pos] === null) {
        Gameboard.board[pos] = playerToken;
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
    return null;
}

function switchMove(pos) {
    if (TicTacToe.move(pos, currentPlayer)) {
        const winner = TicTacToe.check();
        if (winner) {
            endGame(winner);
            return true 
        } else {
            currentPlayer = currentPlayer === playerOneToken ? playerTwoToken : playerOneToken;
        }
    } else {
        alert("Invalid move!")
    }
    }

function endGame(winner) {
    gameOver = true;
    if (winner === playerOneToken) playerOneScore++;
    if (winner === playerTwoToken) playerTwoScore++;
    console.log(`Game is over. Winner: ${winner}`);
    console.log(`Scores - X: ${playerOneScore}, 0: ${playerTwoScore}`);
}

return {
    start: gameStart,
    move: makeMove,
    check: checkMove,
    switch: switchMove
    };
})();