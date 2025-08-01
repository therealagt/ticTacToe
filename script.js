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
        if (
            Gameboard.board[a] !== null &&
            Gameboard.board[a] === Gameboard.board[b] &&
            Gameboard.board[a] === Gameboard.board[c]
        ) {
            console.log(`We have a winner! ${Gameboard.board[a]} wins the game.`);
            return true;
        }
    }
    return false;
}

    

