import { Injectable } from "@angular/core";
import { Constants } from "../model/constants";
import { Piece } from "../model/piece";
import { Bishop } from "../pieces/piece.bishop";
import { King } from "../pieces/piece.king";
import { Knight } from "../pieces/piece.knight.";
import { Pawn } from "../pieces/piece.pawn";
import { Queen } from "../pieces/piece.queen";
import { Rook } from "../pieces/piece.rook";

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
            const value = Number(map.get(i)?.[3] || 0);

            const piece: Piece = { unicode, type, color, value };

            boardConfiguration.push(piece);
        }

        return boardConfiguration;
    }

    static getInitialBoardConfigurationMap() {
        const board = new Map<number, string[]>();

        for (let i = 0; i < 64; i++) {
            board.set(i, ['', '', '']);
        }

        board.set(0, [Rook.blackUnicode, Constants.ROOK, Constants.PIECE_COLOR_BLACK]);
        board.set(1, [Knight.blackUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_BLACK]);
        board.set(2, [Bishop.blackUnicode, Constants.BISHOP, Constants.PIECE_COLOR_BLACK]);
        board.set(3, [Queen.blackUnicode, Constants.QUEEN, Constants.PIECE_COLOR_BLACK]);
        board.set(4, [King.blackUnicode, Constants.KING, Constants.PIECE_COLOR_BLACK]);
        board.set(5, [Bishop.blackUnicode, Constants.BISHOP, Constants.PIECE_COLOR_BLACK]);
        board.set(6, [Knight.blackUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_BLACK]);
        board.set(7, [Rook.blackUnicode, Constants.ROOK, Constants.PIECE_COLOR_BLACK]);

        for (let i = 8; i < 16; i++) {
            board.set(i, [Pawn.blackUnicode, Constants.PAWN, Constants.PIECE_COLOR_BLACK]);
        }

        for (let i = 48; i < 56; i++) {
            board.set(i, [Pawn.whiteUnicode, Constants.PAWN, Constants.PIECE_COLOR_WHITE]);
        }

        board.set(56, [Rook.whiteUnicode, Constants.ROOK, Constants.PIECE_COLOR_WHITE]);
        board.set(57, [Knight.whiteUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_WHITE]);
        board.set(58, [Bishop.whiteUnicode, Constants.BISHOP, Constants.PIECE_COLOR_WHITE]);
        board.set(59, [Queen.whiteUnicode, Constants.QUEEN, Constants.PIECE_COLOR_WHITE]);
        board.set(60, [King.whiteUnicode, Constants.KING, Constants.PIECE_COLOR_WHITE]);
        board.set(61, [Bishop.whiteUnicode, Constants.BISHOP, Constants.PIECE_COLOR_WHITE]);
        board.set(62, [Knight.whiteUnicode, Constants.KNIGHT, Constants.PIECE_COLOR_WHITE]);
        board.set(63, [Rook.whiteUnicode, Constants.ROOK, Constants.PIECE_COLOR_WHITE]);

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