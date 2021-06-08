import { Injectable } from "@angular/core";
import { Bishop } from "../Pieces/bishop";
import { King } from "../Pieces/King";
import { Knight } from "../Pieces/knight";
import { Pawn } from "../Pieces/pawn";
import { Queen } from "../Pieces/Queen";
import { Rook } from "../Pieces/Rook";

Injectable({ providedIn: 'root' })
export class BoardUtil {
    constructor() { }

    static getInitialBoardConfigurationMap() {
        const board = new Map<number, string[]>();

        for (let i = 0; i < 64; i++) {
            board.set(i, ['', '']);
        }

        board.set(0, [Rook.blackRookUnicode, 'R']);
        board.set(1, [Knight.blackKnightUnicode, 'K']);
        board.set(2, [Bishop.blackBishopUnicode, 'B']);
        board.set(3, [Queen.blackQueenUnicode, 'Q']);
        board.set(4, [King.blackKingUnicode, 'KG']);
        board.set(5, [Rook.blackRookUnicode, 'R']);
        board.set(6, [Knight.blackKnightUnicode, 'K']);
        board.set(7, [Bishop.blackBishopUnicode, 'B']);

        board.set(8, [Pawn.blackPawnUnicode, 'P']);
        board.set(9, [Pawn.blackPawnUnicode, 'P']);
        board.set(10, [Pawn.blackPawnUnicode, 'P']);
        board.set(11, [Pawn.blackPawnUnicode, 'P']);
        board.set(12, [Pawn.blackPawnUnicode, 'P']);
        board.set(13, [Pawn.blackPawnUnicode, 'P']);
        board.set(14, [Pawn.blackPawnUnicode, 'P']);
        board.set(15, [Pawn.blackPawnUnicode, 'P']);

        board.set(48, [Pawn.whitePawnUnicode, 'P']);
        board.set(49, [Pawn.whitePawnUnicode, 'P']);
        board.set(50, [Pawn.whitePawnUnicode, 'P']);
        board.set(51, [Pawn.whitePawnUnicode, 'P']);
        board.set(52, [Pawn.whitePawnUnicode, 'P']);
        board.set(53, [Pawn.whitePawnUnicode, 'P']);
        board.set(54, [Pawn.whitePawnUnicode, 'P']);
        board.set(55, [Pawn.whitePawnUnicode, 'P']);

        board.set(56, [Rook.whiteRookUnicode, 'R']);
        board.set(57, [Knight.whiteKnightUnicode, 'K']);
        board.set(58, [Bishop.whiteBishopUnicode, 'B']);
        board.set(59, [Queen.whiteQueenUnicode, 'Q']);
        board.set(60, [King.whiteKingUnicode, 'KG']);
        board.set(61, [Rook.whiteRookUnicode, 'R']);
        board.set(62, [Knight.whiteKnightUnicode, 'K']);
        board.set(63, [Bishop.whiteBishopUnicode, 'B']);

        return board;
    }

    static getRowNumber(index: number) {
        return Math.floor(index / 8);
    }

    static getColumnNumber(index: number) {
        return index % 8;
    }
}