/*
Tic Tac Toe accross browsers
Author: Maripi Maluenda
Date: June 29 2025
Description: Simple  tic tac toe game in two separate browser instances
*/

import { drawBoard, drawDiceRoll, drawStartScreeen } from "./ui.js";
import { makeMove, checkWin } from "./gameLogic.js";
import { saveState, loadState, choseFile } from "./states.js";
import { defaultGameState } from "./startDefault.js";

let gameState = defaultGameState;
const htmlElement = {
    cells: [],
    msg: document.getElementById("msg"),
};
const messages = {
    active: "It's your turn",
    oponent: "Opponent is playing",
    oWin: "You lose :(",
    pwin: "You Win!",
    tie: "It's a tie :|",
};
let thisPlayer = null;
gameState = defaultGameState;

console.log(gameState);
let windowState = { fileOpened: false };
drawStartScreeen(choseFile, gameState, windowState);

setInterval(async () => {
    const loaded = await loadState(defaultGameState);
    //We check if the json has changed
    if (JSON.stringify(loaded) !== JSON.stringify(gameState)) {
        gameState = loaded;
        //If the game has already started,
        if (gameState && gameState.started) {
            drawBoard(gameState, htmlElement, handleCellClick);
        } else if (windowState.fileOpened) {
            drawDiceRoll(gameState);
        } else {
            drawStartScreeen(gameState);
        }
    }
}, 1000);

async function handleCellClick(e, r, c) {
    try {
        gameState = makeMove(gameState, r, c);
        gameState = checkWin(gameState, thisPlayer);

        await saveState(gameState);
        drawBoard(gameState, htmlElement, handleCellClick);
    } catch (error) {
        console.warn(error.message);
    }
}

async function handleDiceGuess(gameState) {
    console.log("Rolling")
    gameState.diceRoll = Math.floor(Math.random * 6 + 1);
}
