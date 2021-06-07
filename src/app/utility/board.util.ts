import { Injectable } from "@angular/core";
import { BlackBishop } from "../Pieces/black.bishop";
import { BlackKing } from "../Pieces/black.king";
import { BlackKnight } from "../Pieces/black.knight";
import { BlackQueen } from "../Pieces/black.queen";
import { BlackRook } from "../Pieces/black.rook";
import { Pawn } from "../Pieces/pawn";
import { WhiteBishop } from "../Pieces/white.bishop";
import { WhiteKing } from "../Pieces/white.king";
import { WhiteKnight } from "../Pieces/white.knight";
import { WhiteQueen } from "../Pieces/white.queen";
import { WhiteRook } from "../Pieces/white.rook";

Injectable({ providedIn: 'root' })
export class BoardUtil {
    constructor() { }

    static getInitialBoardConfigurationMap() {
        const board = new Map<number, string>();

        for (let i = 0; i < 64; i++) {
            board.set(i, '');
        }

        board.set(0, BlackRook.unicode);
        board.set(1, BlackKnight.unicode);
        board.set(2, BlackBishop.unicode);
        board.set(3, BlackQueen.unicode);
        board.set(4, BlackKing.unicode);
        board.set(5, BlackRook.unicode);
        board.set(6, BlackKnight.unicode);
        board.set(7, BlackBishop.unicode);

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

        board.set(56, WhiteRook.unicode);
        board.set(57, WhiteKnight.unicode);
        board.set(58, WhiteBishop.unicode);
        board.set(59, WhiteQueen.unicode);
        board.set(60, WhiteKing.unicode);
        board.set(61, WhiteRook.unicode);
        board.set(62, WhiteKnight.unicode);
        board.set(63, WhiteBishop.unicode);

        return board;
    }

    static getRowNumber(index: number) {
        return Math.floor(index / 8);
    }

    static getColumnNumber(index: number) {
        return index % 8;
    }
}