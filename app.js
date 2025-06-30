/*
Tic Tac Toe accross browsers
Author: Maripi Maluenda
Date: June 29 2025
Description: Simple  tic tac toe game in two separate browser instances
*/

import { drawBoard, drawDiceRoll, drawStartScreeen, drawRolled } from "./ui.js";
import { makeMove, checkWin } from "./gameLogic.js";
import { saveState, loadState, choseFile } from "./states.js";
import { defaultGameState } from "./startDefault.js";

let gameState = defaultGameState;
const htmlElement = {
    cells: [],
    msg: document.getElementById("msg"),
    btn: document.getElementById("btn");
    board: document.getElementById("board");
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
let firstLoad = false;
setInterval(async () => {
    const loaded = await loadState(defaultGameState);
    //We check if the json has changed

    if (!firstLoad) {
        gameState = loaded;
        firstLoad = true;
        return;
    }
    if (windowState.fileOpened) {
        if (JSON.stringify(loaded) !== JSON.stringify(gameState)) {
            gameState = loaded;
            //If the game has already started,XS
            if (gameState && gameState.started) {
                drawBoard(gameState, htmlElement, handleCellClick);
            } else {
                drawDiceRoll(handleDiceGuess, windowState, gameState);
            }
        }
    } else {
        drawStartScreeen(gameState);
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

async function handleDiceGuess(gameState, windowState, val) {
    console.log("Rolling ");
    console.log(val);
    const btn = document.getElementById("btn");
    const msg = document.getElementById("msg");

    if (gameState.guess1) {
        gameState.guess2 = val;

        let diceRoll = Math.floor(Math.random * 6 + 1);
        distance1 = Math.abs(gameState.guess1 - diceRoll);
        distance2 = Math.abs(gameState.guess2 - diceRoll);
        if (distance1 == distance2) {
            console.log("Tie");
            gameState.guess1 = null;
            gameState.guess2 = null;
            drawRolled();
        }
    } else {
        gameState.guess1 = val;
        msg.innerHTML = "Waiting for opponent";
        btn.disabled = true;
    }
    saveState(gameState);

    console.log(gameState);
}
