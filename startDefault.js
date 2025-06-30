//Default starting situation for a 3x3 board
export const defaultGameState = {
    size: 3,
    board: Array.from({ length: 3 }, () => Array(3).fill(0)),
    win: {
        over: false,
        location: null,
        direction: null,
    },
    turn: 0,
    currentPlayer: "O",
    started: false,
    diceRoll: null,
    guess1: null,
    guess2: null,
    fileOpened: 0
};
