import { Injectable } from "@angular/core";
import { Bishop } from "../Pieces/bishop";
import { BlackKing } from "../Pieces/black.king";
import { BlackQueen } from "../Pieces/black.queen";
import { Knight } from "../Pieces/knight";
import { Pawn } from "../Pieces/pawn";
import { Queen } from "../Pieces/Queen";
import { Rook } from "../Pieces/Rook";
import { WhiteKing } from "../Pieces/white.king";
import { WhiteQueen } from "../Pieces/white.queen";

Injectable({ providedIn: 'root' })
export class BoardUtil {
    constructor() { }

    static getInitialBoardConfigurationMap() {
        const board = new Map<number, string>();

        for (let i = 0; i < 64; i++) {
            board.set(i, '');
        }

        board.set(0, Rook.blackRookUnicode);
        board.set(1, Knight.blackKnightUnicode);
        board.set(2, Bishop.blackBishopUnicode);
        board.set(3, Queen.blackQueenUnicode);
        board.set(4, BlackKing.unicode);
        board.set(5, Rook.blackRookUnicode);
        board.set(6, Knight.blackKnightUnicode);
        board.set(7, Bishop.blackBishopUnicode);

        board.set(8, Pawn.blackPawnUnicode);
        board.set(9, Pawn.blackPawnUnicode);
        board.set(10, Pawn.blackPawnUnicode);
        board.set(11, Pawn.blackPawnUnicode);
        board.set(12, Pawn.blackPawnUnicode);
        board.set(13, Pawn.blackPawnUnicode);
        board.set(14, Pawn.blackPawnUnicode);
        board.set(15, Pawn.blackPawnUnicode);

        board.set(48, Pawn.whitePawnUnicode);
        board.set(49, Pawn.whitePawnUnicode);
        board.set(50, Pawn.whitePawnUnicode);
        board.set(51, Pawn.whitePawnUnicode);
        board.set(52, Pawn.whitePawnUnicode);
        board.set(53, Pawn.whitePawnUnicode);
        board.set(54, Pawn.whitePawnUnicode);
        board.set(55, Pawn.whitePawnUnicode);

        board.set(56, Rook.whiteRookUnicode);
        board.set(57, Knight.whiteKnightUnicode);
        board.set(58, Bishop.whiteBishopUnicode);
        board.set(59, Queen.whiteQueenUnicode);
        board.set(60, WhiteKing.unicode);
        board.set(61, Rook.whiteRookUnicode);
        board.set(62, Knight.whiteKnightUnicode);
        board.set(63, Bishop.whiteBishopUnicode);

        return board;
    }

    static getRowNumber(index: number) {
        return Math.floor(index / 8);
    }

    static getColumnNumber(index: number) {
        return index % 8;
    }
}