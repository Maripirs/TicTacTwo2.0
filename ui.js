import { choseFile } from "./states.js";

/*
UI for Tic Tac Toe accross browsers
Author: Maripi Maluenda
Date: June 29 2025
Description: Simple UI for tic tac toe game in two separate browser instances
*/
const handleCreateFile = () => {
    choseFile(gameState, windowState);
};
export function drawBoard(boardState) {
    function drawWin(htmlElement, boardState) {
        if (boardState.win.direction == "n") {
            let fullBoard = document.getElementById("board");
            fullBoard.classList.add("tie");
        }
        if (boardState.win.direction == "h") {
            for (let i = 0; i < boardState.size; i++) {
                htmlElement.cells[boardState.win.location][i].classList.add(
                    "winner"
                );
            }
            return;
        }
        if (boardState.win.direction == "v") {
            for (let i = 0; i < boardState.size; i++) {
                htmlElement.cells[i][boardState.win.location].classList.add(
                    "winner"
                );
            }
            return;
        }
        if (boardState.win.direction == "d") {
            for (let i = 0; i < boardState.size; i++) {
                htmlElement.cells[i][i].classList.add("winner");
            }
            return;
        }
        if (boardState.win.direction == "u") {
            for (let i = 0; i < boardState.size; i++) {
                htmlElement.cells[boardState.size - 1 - i][i].classList.add(
                    "winner"
                );
            }
            return;
        }
    }

    let htmlElement = {
        cells: [],
        msg: document.getElementById("msg"),
    };
    let numRows = boardState.size;
    htmlElement.cells = Array.from({ length: numRows }, () =>
        Array(numRows).fill(null)
    );

    const board = document.getElementById("board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${numRows}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
    const totalCells = numRows * numRows;
    board.classList.remove("tie");

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numRows; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("role", "button");
            cell.addEventListener("click", () => {
                console.log("Hi, just clicking");
            });
            //Find edges
            if (i == 0) cell.classList.add("top");
            if (j == 0) cell.classList.add("left");
            if (j == numRows - 1) cell.classList.add("right");
            if (i == numRows - 1) cell.classList.add("bottom");

            cell.classList.add("cell");
            if (boardState.board[i][j] != 0) {
                cell.innerHTML = boardState.board[i][j];
            } else {
                cell.innerHTML = "";
            }
            cell.gridX = i;
            cell.gridY = j;
            board.appendChild(cell);
            htmlElement.cells[i][j] = cell;
        }
    }
    htmlElement.msg.innerHTML = "";
    if (boardState.win.over) {
        drawWin(htmlElement, boardState);
    }
}

export function drawDiceRoll(handleDiceGuess, windowState, gameState) {
    const board = document.getElementById("board");
    const btn = document.createElement("button");
    btn.setAttribute("id", "btn");
    const inp = document.createElement("input");
    document.body.appendChild(btn);

    board.innerHTML = "";
    inp.setAttribute("type", "number");
    inp.min = "1";
    inp.max = "6";
    inp.placeholder = "1-6";
    inp.classList.add("inpBox");
    board.appendChild(inp);
    board.classList.remove("hidden");
    btn.innerHTML = "Roll Dice";
    btn.addEventListener("click", () =>
        handleDiceGuess(gameState, windowState, inp.value)
    );
    inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleDiceGuess(gameState, windowState, inp.value);
        }
    });
    msg.innerHTML = "Enter your guess for the dice roll";
}

export function drawStartScreeen(choseFile, gameState, windowState) {
    console.log("Load Screen");
    const msg = document.getElementById("msg");
    const btn = document.getElementById("btn");
    const board = document.getElementById("board");
    board.classList.add("hidden");
    msg.innerHTML = "In order to play. Please create the required file";
    btn.innerHTML = "Create File";
    btn.addEventListener("click", async () => {
        await choseFile(gameState, windowState);
        if (windowState.fileOpened) {
            btn.remove();
        }
    });
}
