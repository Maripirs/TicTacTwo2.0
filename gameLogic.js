
/*
Game Logic for Tic Tac Toe accross browsers
Author: Maripi Maluenda
Date: June 29 2025
Description: Simple game logic for tic tac toe game in two separate browser instances
*/

/**
     * Applies the chosen move to the 
     * @param {Object} boardState - The current state of the game
     * @param {string} player - 'X' for human or 'O' for computer
     * @returns {[number, number]} Coordenates of the cell to either block or complete the line
     */
export function makeMove(boardState, r, c) {
    boardState.turn = boardState.turn +1;
    boardState.currentPlayer = boardState.currentPlayer == 'O' ? 'X': 'O'
}
/**
 * Checks if the given player has won the came
 * @param {Object} boardState - The current state of the game
 * @param {string} player - 'X' or 'O'
 * @returns {void} updated boardState.win based on findings
 */
export function checkWin(boardSt, player) {
    let numRows = boardSt.size;
    let complete = true;

    for (let i = 0; i < numRows; i++) {
        complete = true;
        for (let j = 0; j < numRows; j++) {
            if (boardSt.board[i][j] != player) {
                complete = false;
                break;
            }
        }
        if (complete) {
            boardSt.win = { direction: "h", location: i, over: true };
            return boardSt;
        }
    }
    for (let i = 0; i < numRows; i++) {
        let complete = true;
        for (let j = 0; j < numRows; j++) {
            if (boardSt.board[j][i] != player) {
                complete = false;
                break;
            }
        }
        if (complete) {
            boardSt.win = { direction: "v", location: i, over: true };
            return boardSt;
        }
    }
    complete = true;
    for (let j = 0; j < numRows; j++) {
        if (boardSt.board[j][j] !== player) {
            complete = false;
            break;
        }
    }
    if (complete) {
        boardSt.win = { direction: "d", location: 0, over: true };
        return boardSt
    }
    complete = true;
    for (let j = 0; j < numRows; j++) {
        if (boardSt.board[numRows - 1 - j][j] !== player) {
            complete = false;
            break;
        }
    }
    if (complete) {
        boardSt.win = { direction: "u", location: 0, over: true };
        return boardSt
    }
    if (boardSt.turn == 9) {
        boardSt.win = { direction: "n", location: 0, over: true };
    }
    return boardSt;
}

export function diceRoll(){
    
}