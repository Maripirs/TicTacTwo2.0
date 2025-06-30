import { defaultGameState } from "./startDefault.js";

/*
API managment for Tic Tac Toe accross browsers
Author: Maripi Maluenda
Date: June 29 2025
Description: File System Access API for tic tac toe game in two separate browser instances
*/
let fileHandle = null;
export async function loadState(gameState) {
    if (!fileHandle) {
        return gameState;
    }
    const file = await fileHandle.getFile();
    const content = await file.text();
    try {
        return content.trim() ? JSON.parse(content) : gameState;
    } catch {
        console.warn("failed parse");
        return gameState;
    }
}
export async function saveState(gameState) {
    if (!fileHandle) {
        return;
    }
    console.log("saving");
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(gameState, null, 2));
    await writable.close();
}

export async function choseFile(gameState, windowState) {
    //https://developer.chrome.com/docs/capabilities/web-apis/file-system-access
    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: "Game State",
                    accept: {
                        "application/json": [".json"],
                    },
                },
            ],
        });
    } catch (err) {
        fileHandle = await window.showSaveFilePicker({
            suggestedName: "gameState.json",
            types: [
                {
                    description: "Game State",
                    accept: {
                        "application/json": [".json"],
                    },
                },
            ],
        });
        await saveState(defaultGameState);
    }

    gameState.fileOpened = gameState.fileOpened + 1;
    windowState.thisWindow = gameState.fileOpened;
    const writable = await fileHandle.createWritable();
    await writable.write({
        type: "write",
        data: JSON.stringify(gameState, null, 2),
        position: 0,
    });
    await writable.close();

    const file = await fileHandle.getFile();
    const content = await file.text();
    console.log(content);
    windowState.fileOpened = true;
    console.log(windowState);
}
