import { Injectable } from "@angular/core";
import { Constants } from "../model/constants";
import { Piece } from "../model/Piece";
import { Bishop } from "../Pieces/bishop";
import { King } from "../Pieces/King";
import { Knight } from "../Pieces/knight";
import { Pawn } from "../Pieces/pawn";
import { Queen } from "../Pieces/Queen";
import { Rook } from "../Pieces/Rook";

Injectable({ providedIn: 'root' })
export class BoardUtil {
    constructor() { }

    static getInitialBoardConfiguration() {

        const map = this.getInitialBoardConfigurationMap();

        let boardConfiguration: Piece[] = [];

        for (let i = 0; i < 64; i++) {
            const unicode = map.get(i)?.[0] || '';
            const type = map.get(i)?.[1] || '';
            const color = map.get(i)?.[2] || ''

            const piece: Piece = { unicode, type, color, index: i };

            boardConfiguration.push(piece);
        }

        return boardConfiguration;
    }

    static getInitialBoardConfigurationMap() {
        const board = new Map<number, string[]>();

        for (let i = 0; i < 64; i++) {
            board.set(i, ['', '', '']);
        }

        board.set(0, [Rook.blackRookUnicode, Constants.ROOK, Constants.PIECE_COLOR_BLACK]);
        board.set(1, [Knight.blackKnightUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_BLACK]);
        board.set(2, [Bishop.blackBishopUnicode, Constants.BISHOP, Constants.PIECE_COLOR_BLACK]);
        board.set(3, [Queen.blackQueenUnicode, Constants.QUEEN, Constants.PIECE_COLOR_BLACK]);
        board.set(4, [King.blackKingUnicode, Constants.KING, Constants.PIECE_COLOR_BLACK]);
        board.set(5, [Bishop.blackBishopUnicode, Constants.BISHOP, Constants.PIECE_COLOR_BLACK]);
        board.set(6, [Knight.blackKnightUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_BLACK]);
        board.set(7, [Rook.blackRookUnicode, Constants.ROOK, Constants.PIECE_COLOR_BLACK]);

        for (let i = 8; i < 16; i++) {
            board.set(i, [Pawn.blackPawnUnicode, Constants.PAWN, Constants.PIECE_COLOR_BLACK]);
        }

        for (let i = 48; i < 56; i++) {
            board.set(i, [Pawn.whitePawnUnicode, Constants.PAWN, Constants.PIECE_COLOR_WHITE]);
        }

        board.set(56, [Rook.whiteRookUnicode, Constants.ROOK, Constants.PIECE_COLOR_WHITE]);
        board.set(57, [Knight.whiteKnightUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_WHITE]);
        board.set(58, [Bishop.whiteBishopUnicode, Constants.BISHOP, Constants.PIECE_COLOR_WHITE]);
        board.set(59, [Queen.whiteQueenUnicode, Constants.QUEEN, Constants.PIECE_COLOR_WHITE]);
        board.set(60, [King.whiteKingUnicode, Constants.KING, Constants.PIECE_COLOR_WHITE]);
        board.set(61, [Bishop.whiteBishopUnicode, Constants.BISHOP, Constants.PIECE_COLOR_WHITE]);
        board.set(62, [Knight.whiteKnightUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_WHITE]);
        board.set(63, [Rook.whiteRookUnicode, Constants.ROOK, Constants.PIECE_COLOR_WHITE]);

        return board;
    }

    static getBackgroundColor(index: number) {

        let color = Constants.BOX_COLOR_ONE;

        const row = BoardUtil.getRowNumber(index);
        const column = BoardUtil.getColumnNumber(index);

        if ((row + column) % 2 === 0) {
            color = Constants.BOX_COLOR_TWO;
        }

        return color;
    }

    static getPiece(color: string, type: string, unicode: string) {
        const piece = { color, type, unicode };

        return piece;
    }

    static getRowNumber(index: number) {
        return Math.floor(index / 8);
    }

    static getColumnNumber(index: number) {
        return index % 8;
    }
}