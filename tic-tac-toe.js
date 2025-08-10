let gameParent = document.querySelector("body");

let board = (function () {
    let board = [[null, null, null], [null, null, null], [null, null, null]];

    function getBoard () {
        return board.map(row => [...row]);
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

    return {board, getBoard, placeMarker, clearBoard};

})();

function newPlayer (name, marker) {
    function getName () {return name;};
    function getMarker () {return marker;};
    
    return {getName, getMarker}
}

let game = (function () {
    let player1, player2, activePlayer, renderer;

    function play(root) {
        renderer = newRenderer(root);
        renderer.askForPlayers();
    }

    function setPlayerOne (name) {
        player1 = newPlayer(name, "x");
        activePlayer = player1;
    }

    function setPlayerTwo (name) {
        player2 = newPlayer(name, "o");
        renderer.newTurn(activePlayer);
    }

    function placeMarker (row, column) {
        let winner = board.placeMarker(activePlayer.getMarker(), row, column);
        renderer.placeMarker(activePlayer.getMarker(), row, column);
        if (winner) {
            renderer.declareWinner(activePlayer);
        }
        else {
            toggleActivePlayer();
            renderer.newTurn(activePlayer);
        }
    }

    function toggleActivePlayer() {
        if (activePlayer === player1) activePlayer = player2; else activePlayer = player1;
    }

    function reset () {
        player1 = null;
        player2 = null;
        activePlayer = null;
        
        board.clearBoard();
        renderer.clearBoard();

        renderer.askForPlayers();
    }

    return {play, setPlayerOne, setPlayerTwo, placeMarker, reset};
})();

function newRenderer (root) {
    function askForPlayers () {
        console.log("Create your players!");
    }

    function newTurn (activePlayer) {
        console.log(`It is ${activePlayer.getName()}'s turn. Please place an ${activePlayer.getMarker()}.`);
    }
    
    function declareWinner (player) {
        console.log(`${player.getName()} wins!`);
        console.log("Reset for another game?");
    }

    function placeMarker (marker, row, column) {
        console.log("Marker placed!");
        console.log(...board.getBoard());
    }

    function clearBoard () {
        console.log("Board cleared!");
    }

    return {askForPlayers, newTurn, declareWinner, placeMarker, clearBoard}
}