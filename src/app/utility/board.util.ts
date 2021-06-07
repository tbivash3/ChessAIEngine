import { Injectable } from "@angular/core";
import { BlackBishop } from "../Pieces/black.bishop";
import { BlackKing } from "../Pieces/black.king";
import { BlackKnight } from "../Pieces/black.knight";
import { BlackPawn } from "../Pieces/black.pawn";
import { BlackQueen } from "../Pieces/black.queen";
import { BlackRook } from "../Pieces/black.rook";
import { WhiteBishop } from "../Pieces/white.bishop";
import { WhiteKing } from "../Pieces/white.king";
import { WhiteKnight } from "../Pieces/white.knight";
import { WhitePawn } from "../Pieces/white.pawn";
import { WhiteQueen } from "../Pieces/white.queen";
import { WhiteRook } from "../Pieces/white.rook";

Injectable({ providedIn: 'root' })
export class BoardUtil {
    constructor() { }

    static black_pawn_unicode = "\u265F";

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

        board.set(8, BoardUtil.black_pawn_unicode);
        board.set(9, BoardUtil.black_pawn_unicode);
        board.set(10, BoardUtil.black_pawn_unicode);
        board.set(11, BoardUtil.black_pawn_unicode);
        board.set(12, BoardUtil.black_pawn_unicode);
        board.set(13, BoardUtil.black_pawn_unicode);
        board.set(14, BoardUtil.black_pawn_unicode);
        board.set(15, BoardUtil.black_pawn_unicode);

        board.set(48, WhitePawn.unicode);
        board.set(49, WhitePawn.unicode);
        board.set(50, WhitePawn.unicode);
        board.set(51, WhitePawn.unicode);
        board.set(52, WhitePawn.unicode);
        board.set(53, WhitePawn.unicode);
        board.set(54, WhitePawn.unicode);
        board.set(55, WhitePawn.unicode);

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