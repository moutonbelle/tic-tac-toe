/*

GAMEBOARD
-- domBoard = container of DOM board
-- Board [2][2]
-- winner = null | player
-- placeMarker (player, posX, posY) {
    board[posX][posY] = player.marker
    return checkWinner(player) 
}
-- checkWinner (player) {
    for each row, check if row sum == 3x player.marker
        if so, return player
    else for each column check if column sum == 3x player.marker ("xxx")
        if so, return player
    else if [0][0] + [1][1] + [2][2] == 3x player marker
        return palyer
    else if [2][2] + [1][1] + [0][0] == 3x player marker
        return player
    ellse return null
-- drawNewBoard () {
    create 3x rows of 3x columns
}

PLAYER
-- name
-- marker

-- getNextMove

GAME
-- player1
-- player2
-- activePlayer

-- play (domParent)
    Create players
    Draw new board (gameboard.drawNewBoard(domParent))
    while !gameBoard.winner
        activePlayer.getNextMove();
        toggle(activePlayer) -- this.activePlayer = blah;
    display winner
    draw reset screen

-- playRound ()
    Solicit player choice
    gameboard.placeMarker

*/

let gameParent = document.querySelector("body");

let board = (function () {
    let board = [[null, null, null], [null, null, null], [null, null, null]];

    function getBoard () {
        return readOnlyBoard = board.map(row => [...row]);
    }

    function placeMarker (marker, row, column) {
        board[row][column] = marker;
        return checkForWinner(marker);
    }

    function checkForWinner (marker) {
        let threeInARow = marker + marker + marker;
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] + board[i][1] + board[i][2] === threeInARow) return true;
            if (board[0][i] + board[1][i] + board[2][i] === threeInARow) return true;
        }
        if (board[0][0] + board[1][1] + board[2][2] === threeInARow) return true;
        if (board[0][2] + board[1][1] + board[2][0] === threeInARow) return true;
        return false;
    }

    function clearBoard () {
        board = [[null, null, null], [null, null, null], [null, null, null]];        
    }

    return {getBoard, placeMarker, clearBoard};

})();

function newPlayer (name, marker) {
    return {name, marker}
}

let game = (function () {
    let player1, player2, activePlayer;
    let board;


})();