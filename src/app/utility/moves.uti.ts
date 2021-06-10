import { Piece } from "../model/Piece";
import { Bishop } from "../Pieces/bishop";
import { King } from "../Pieces/King";
import { Knight } from "../Pieces/knight";
import { Pawn } from "../Pieces/pawn";
import { Queen } from "../Pieces/Queen";
import { Rook } from "../Pieces/Rook";

export class MovesUtil {

    static getValidMoves(index: number, boardConfiguration: Piece[]) {

        const pieceInfo = boardConfiguration[index];

        let moves: number[] = [];

        let pieceUnicode = pieceInfo.unicode;

        let pieceColor = pieceInfo.color;

        if (pieceUnicode === Pawn.blackPawnUnicode || pieceUnicode === Pawn.whitePawnUnicode) {
            moves = Pawn.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Rook.blackRookUnicode || pieceUnicode === Rook.whiteRookUnicode) {
            moves = Rook.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Knight.blackKnightUnicode || pieceUnicode === Knight.whiteKnightUnicode) {
            moves = Knight.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Bishop.blackBishopUnicode || pieceUnicode === Bishop.whiteBishopUnicode) {
            moves = Bishop.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Queen.blackQueenUnicode || pieceUnicode === Queen.whiteQueenUnicode) {
            moves = Queen.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === King.blackKingUnicode || pieceUnicode === King.whiteKingUnicode) {
            moves = King.getMoves(index, boardConfiguration, pieceColor);
        }

        return moves;
    }
}