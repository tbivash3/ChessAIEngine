import { Constants } from "../model/constants";
import { Piece } from "../model/piece";
import { Bishop } from "../pieces/piece.bishop";
import { King } from "../pieces/piece.king";
import { Knight } from "../pieces/piece.knight.";
import { Pawn } from "../pieces/piece.pawn";
import { Queen } from "../pieces/piece.queen";
import { Rook } from "../pieces/piece.rook";

export class MovesUtil {

    constructor() { }

    getValidMoves(index: number, currentPlayer: string, blackKingIndex: number, whiteKingIndex: number, boardConfiguration: Piece[]): number[] {
        let validMoves = this.getIndividualPieceMoves(index, boardConfiguration);

        let validMoveOpponentNextMovesMap = this.getOpponentMovesMap(index, currentPlayer, validMoves, boardConfiguration);

        validMoves = validMoves.filter(move => {
            let currentKingIndex = this.getCurrentKingIndex(currentPlayer, blackKingIndex, whiteKingIndex);

            if (index === currentKingIndex) currentKingIndex = move;

            return !validMoveOpponentNextMovesMap.get(move)?.has(currentKingIndex)
        });

        return validMoves;
    }

    getIndividualPieceMoves(index: number, boardConfiguration: Piece[]): number[] {

        const pieceInfo = boardConfiguration[index];

        let moves: number[] = [];

        let pieceUnicode = pieceInfo.unicode;

        let pieceColor = pieceInfo.color;

        if (pieceUnicode === Pawn.blackUnicode || pieceUnicode === Pawn.whiteUnicode) {
            moves = Pawn.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Rook.blackUnicode || pieceUnicode === Rook.whiteUnicode) {
            moves = Rook.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Knight.blackUnicode || pieceUnicode === Knight.whiteUnicode) {
            moves = Knight.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Bishop.blackUnicode || pieceUnicode === Bishop.whiteUnicode) {
            moves = Bishop.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === Queen.blackUnicode || pieceUnicode === Queen.whiteUnicode) {
            moves = Queen.getMoves(index, boardConfiguration, pieceColor);

        } else if (pieceUnicode === King.blackUnicode || pieceUnicode === King.whiteUnicode) {
            moves = King.getMoves(index, boardConfiguration, pieceColor);
        }

        return moves;
    }

    getOpponentMovesMap(sourceIndex: number, currentPlayer: string, validMoves: number[], boardConfiguration: Piece[]): Map<number, Set<number>> {

        let allMoves = new Map<number, Set<number>>();

        validMoves.forEach(moveIndex => {

            let destinationPiece = boardConfiguration[moveIndex];
            let sourcePiece = boardConfiguration[sourceIndex];

            this.mockMove(sourceIndex, moveIndex, boardConfiguration);

            let oppositePlayerAllMoves = this.getOppositePlayerAllPieceMoves(currentPlayer, boardConfiguration);

            allMoves.set(moveIndex, new Set(oppositePlayerAllMoves));

            boardConfiguration[sourceIndex] = sourcePiece;
            boardConfiguration[moveIndex] = destinationPiece;

        });

        return allMoves;

    }

    getOppositePlayerAllPieceMoves(currentPlayer: string, boardConfiguration: Piece[]): number[] {
        let oppositePlayer = currentPlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;

        let allMoves: number[] = [];
        for (let i = 0; i < boardConfiguration.length; i++) {

            const piece = boardConfiguration[i];

            if (piece.color === oppositePlayer) {

                let moves = this.getIndividualPieceMoves(i, boardConfiguration);

                allMoves = allMoves.concat(moves);

            }
        }

        return allMoves;
    }

    getCurrentKingIndex(currentPlayer: string, blackKingIndex: number, whiteKingIndex: number) {
        return currentPlayer === Constants.PLAYER_ONE ? blackKingIndex : whiteKingIndex;
    }

    mockMove(sourceIndex: number, moveIndex: number, boardConfiguration: Piece[]) {
        boardConfiguration[moveIndex] = boardConfiguration[sourceIndex];
        boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '', value: 0 };
    }
}


