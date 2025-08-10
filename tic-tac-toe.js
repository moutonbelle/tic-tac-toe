let board = (function () {
    let board = [[null, null, null], [null, null, null], [null, null, null]];

    function getBoard() {
        return board.map(row => [...row]);
    }

    function placeMarker(marker, row, column) {
        board[row][column] = marker;
        return checkForWinner(marker);
    }

    function checkForWinner(marker) {
        let threeInARow = marker + marker + marker;
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] + board[i][1] + board[i][2] === threeInARow) return true;
            if (board[0][i] + board[1][i] + board[2][i] === threeInARow) return true;
        }
        if (board[0][0] + board[1][1] + board[2][2] === threeInARow) return true;
        if (board[0][2] + board[1][1] + board[2][0] === threeInARow) return true;
        return false;
    }

    function clearBoard() {
        board = [[null, null, null], [null, null, null], [null, null, null]];
    }

    return { getBoard, placeMarker, clearBoard };

})();

function newPlayer(name, marker) {
    function getName() { return name; };
    function getMarker() { return marker; };

    return { getName, getMarker }
}

let game = (function () {
    let player1, player2, activePlayer, renderer;

    function play(root) {
        renderer = newRenderer(root);
        renderer.askForPlayers();
    }

    function setPlayerOne(name) {
        player1 = newPlayer(name, "x");
        activePlayer = player1;
    }

    function setPlayerTwo(name) {
        player2 = newPlayer(name, "o");
        renderer.newTurn(activePlayer);
    }

    function placeMarker(row, column) {
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

    function reset() {
        player1 = null;
        player2 = null;
        activePlayer = null;

        board.clearBoard();
        renderer.clearBoard();

        renderer.askForPlayers();
    }

    return { play, setPlayerOne, setPlayerTwo, placeMarker, reset };
})();

function newRenderer(root) {
    let container = document.createElement("div");
    container.id = "container";
    root.prepend(container);

    let boardContainer = document.createElement("div");
    boardContainer.id = "board-container";
    container.append(boardContainer);

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            let newCell = document.createElement("div");
            newCell.dataset.row = i;
            newCell.dataset.column = j;
            newCell.classList.add("board-cell");
            newCell.style.gridRow = i + 1;
            newCell.style.gridColumn = j + 1;
            boardContainer.append(newCell);
        }
    }

    let outputContainer = document.createElement("div");
    outputContainer.id = "output-container";
    container.append(outputContainer);

    let output = document.createElement("p");
    output.id = "output";
    outputContainer.append(output);

    let playerInputs = document.createElement("div");
    playerInputs.id = "player-inputs";

    let playerOneInputContainer = document.createElement("div");
        let playerOneInputLabel = document.createElement("label");
        playerOneInputLabel.textContent = "Player 1: ";
        let playerOneInput = document.createElement("input");
    playerOneInputContainer.append(playerOneInputLabel, playerOneInput);

    let playerTwoInputContainer = document.createElement("div");
        let playerTwoInputLabel = document.createElement("label");
        playerTwoInputLabel.textContent = "Player 2: ";
        let playerTwoInput = document.createElement("input");
    playerTwoInputContainer.append(playerTwoInputLabel, playerTwoInput);

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Create players";

    playerInputs.append(playerOneInputContainer, playerTwoInputContainer, submitButton);
    outputContainer.append(playerInputs);
    playerInputs.style.display = "none";

    function askForPlayers() {
        console.log("Create your players!");
        output.textContent = "Create your players!";
        playerInputs.style.display = "flex";
        submitButton.addEventListener("click", () => {
            game.setPlayerOne(playerOneInput.value);
            game.setPlayerTwo(playerTwoInput.value);
            resetPlayerInput();
        });
    }

    function resetPlayerInput () {
        playerOneInput.value = "";
        playerTwoInput.value = ""
        playerInputs.style.display = "none";
    }

    function newTurn(activePlayer) {
        console.log(`It is ${activePlayer.getName()}'s turn. Please place an ${activePlayer.getMarker()}.`);

        output.textContent = `It is ${activePlayer.getName()}'s turn. Please place an ${activePlayer.getMarker()}.`;
    }

    function declareWinner(player) {
        console.log(`${player.getName()} wins!`);
        console.log("Reset for another game?");
    }

    function placeMarker(marker, row, column) {
        console.log("Marker placed!");
        console.log(...board.getBoard());
    }

    function clearBoard() {
        console.log("Board cleared!");
    }

    return { askForPlayers, newTurn, declareWinner, placeMarker, clearBoard }
}

game.play(document.querySelector("body"));