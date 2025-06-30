/*
API managment for Tic Tac Toe accross browsers
Author: Maripi Maluenda
Date: June 29 2025
Description: File System Access API for tic tac toe game in two separate browser instances
*/
let fileHandle = null;
export async function loadState(gameState) {
    if (!fileHandle) {
        return;
    }
    const file = await fileHandle.getFile();
    const content = await file.text();
    try {
        return text.trim() ? JSON.parse(text) : gameState;
    } catch {
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
    console.log(gameState);
    console.log("Fucntion choseFIle called");
    fileHandle = await window.showSaveFilePicker({
        suggestedName: "gameState.json",
        types: [
            {
                description: "Gamestate",
                accept: {
                    "application/json": [".json"],
                },
            },
        ],
    });

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
