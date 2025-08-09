/*

GAMEBOARD
-- domBoard = container of DOM board
-- Board [2][2]
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

GAME
-- player1
-- player2
-- activePlayer

-- play (domParent)
    Create players
    Draw new board (gameboard.drawNewBoard(domParent))
    while !winner
        playRound(activePlayer)
        toggle(activePlayer) -- this.activePlayer = blah;
    display winner
    draw reset screen

-- playRound ()
    Solicit player choice
    gameboard.placeMarker

*/