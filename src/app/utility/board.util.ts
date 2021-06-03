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

    getInitialBoardConfigurationMap() {
        const board = new Map<number, string>();

        board.set(0, new BlackRook().unicode);
        board.set(1, new BlackKnight().unicode);
        board.set(2, new BlackBishop().unicode);
        board.set(3, new BlackQueen().unicode);
        board.set(4, new BlackKing().unicode);
        board.set(5, new BlackRook().unicode);
        board.set(6, new BlackKnight().unicode);
        board.set(7, new BlackBishop().unicode);

        board.set(8, new BlackPawn().unicode);
        board.set(9, new BlackPawn().unicode);
        board.set(10, new BlackPawn().unicode);
        board.set(11, new BlackPawn().unicode);
        board.set(12, new BlackPawn().unicode);
        board.set(13, new BlackPawn().unicode);
        board.set(14, new BlackPawn().unicode);
        board.set(15, new BlackPawn().unicode);

        board.set(48, new WhitePawn().unicode);
        board.set(49, new WhitePawn().unicode);
        board.set(50, new WhitePawn().unicode);
        board.set(51, new WhitePawn().unicode);
        board.set(52, new WhitePawn().unicode);
        board.set(53, new WhitePawn().unicode);
        board.set(54, new WhitePawn().unicode);
        board.set(55, new WhitePawn().unicode);

        board.set(56, new WhiteRook().unicode);
        board.set(57, new WhiteKnight().unicode);
        board.set(58, new WhiteBishop().unicode);
        board.set(59, new WhiteQueen().unicode);
        board.set(60, new WhiteKing().unicode);
        board.set(61, new WhiteRook().unicode);
        board.set(62, new WhiteKnight().unicode);
        board.set(63, new WhiteBishop().unicode);

        return board;
    }
}