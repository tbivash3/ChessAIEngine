import { Constants } from "../model/constants";
import { Piece } from "../model/piece";
import { Bishop } from "../Pieces/piece.bishop";
import { King } from "../Pieces/piece.king";
import { Knight } from "../Pieces/piece.knight.";
import { Pawn } from "../Pieces/piece.pawn";
import { Queen } from "../Pieces/piece.queen";
import { Rook } from "../Pieces/piece.rook";


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

    getIndividualPieceMoves(index: number, boardConfiguration: Piece[]) {

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
        boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '', index: -1 };
    }
}


