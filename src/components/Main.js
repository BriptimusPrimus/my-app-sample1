import { useState, useEffect } from 'react';
import './Main.css';

function Main() {
    return (
        <main>
            <Game />
        </main>
    )
}

export default Main;


const chooseRandom = function (pool, number) {
    const chosen = [];

    for (let i = 0; i < number; i += 1) {
        const total = pool.length;
        const ran = Math.floor(Math.random() * total);
        chosen.push(pool[ran]);
        pool.splice(ran, 1);
    }

    return chosen;
};

const createBoard = function ({ width, height, mines }) {
    const totalCells = width * height;

    const pool = Array(totalCells)
        .fill(null)
        .map((_, idx) => idx);

    const chosenCells = chooseRandom(pool, mines);

    const board = Array(height)
        .fill(null)
        .map(_ => Array(width));

    for (let i = 0; i < height; i += 1) {
        for (let j = 0; j < width; j += 1) {
            board[i][j] = {
                mine: false,
                open: false,
                flag: false
            };
        }
    }

    chosenCells.forEach((chosen) => {
        const row = Math.floor(chosen / width);
        const col = chosen % width;
        board[row][col].mine = true;
    });

    return board;
};

function Game() {
    const gameVars = {
        width: 5,
        height: 4,
        mines: 5
    };

    const [board, setBoard] = useState(createBoard(gameVars));

    const openCell = (row, col) => {
        setBoard((prevMatrix) => {
            const newMatrix = prevMatrix.map((row) => [...row]);

            newMatrix[row][col] = {
                ...newMatrix[row][col],
                open: true
            };

            return newMatrix;
        });
    }

    const setFlag = (row, col) => {
        setBoard((prevMatrix) => {
            const newMatrix = prevMatrix.map((row) => [...row]);

            newMatrix[row][col] = {
                ...newMatrix[row][col],
                flag: true
            };

            return newMatrix;
        });
    };

    console.log({
        board
    });

    return (
        <div className="game">
            <Board
                width={gameVars.width}
                height={gameVars.height}
                mines={gameVars.mines}
                board={board}
                onClickCell={openCell}
                onSecondaryClickCell={setFlag}
            />
        </div>
    )
}

function Board({
    width,
    height,
    mimes,
    board,
    onClickCell,
    onSecondaryClickCell
}) {
    return (
        <div className="board">
            {board.map((row, idx) => {
                return (
                    <Row
                        key={idx}
                        row={row}
                        rowIdx={idx}
                        onClickCell={onClickCell}
                        onSecondaryClickCell={onSecondaryClickCell}
                    />
                );
            })}
        </div>
    )
}

function Row({ row, rowIdx, onClickCell, onSecondaryClickCell }) {
    return (
        <div
            className="row"
        >
            {row.map((cell, idx) => {
                const { mine, open, flag } = cell;
                return (
                    <Cell
                        cell={cell}
                        key={idx}
                        mine={mine}
                        open={open}
                        flag={flag}
                        rowIdx={rowIdx}
                        colIdx={idx}
                        onClickCell={onClickCell}
                        onSecondaryClickCell={onSecondaryClickCell}
                    />
                );
            })}

        </div>
    )
}

function Cell({
    cell,
    rowIdx,
    colIdx,
    onClickCell,
    onSecondaryClickCell
}) {

    const { mine, open, flag } = cell;

    const onPrimaryClick = () => {
        onClickCell(rowIdx, colIdx);
    };

    const onSecondaryClick = (event) => {
        event.preventDefault();
        onSecondaryClickCell(rowIdx, colIdx);
    }

    if (open && mine) {
        return (
            <button
                className="cell cell__explode"
            >
                X
            </button>
        );
    }

    if (open && !mine) {
        return (
            <button
                className="cell cell__open"
            >
            </button>
        );
    }

    console.log({
        open,
        flag,
        r: flag && !open
    });
    if (flag && !open) {
        console.log('yay')
        return (
            <button
                className="cell cell__flag"
            >
                △
            </button>
        );
    }

    // open and no flag
    return (
        <button
            className="cell"
            onClick={onPrimaryClick}
            onContextMenu={onSecondaryClick}
        >
        </button>
    );

}