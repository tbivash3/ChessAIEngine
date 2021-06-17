import { Injectable } from "@angular/core";
import { Constants } from "../model/constants";
import { Piece } from "../model/piece";
import { MovesUtil } from "./moves.util";

@Injectable({ providedIn: 'root' })
export class Minimax {

    optimalMove = [-1, -1]

    constructor(private movesUtil: MovesUtil) { }

    findBestMove(board: Piece[], depth: number, maximizingPlayer: string, blackKingIndex: number, whiteKingIndex: number) {

        this.minimax(board, depth, true, maximizingPlayer, blackKingIndex, whiteKingIndex, true);

        return this.optimalMove;
    }

    minimax(board: Piece[], depth: number, isMaximizingPlayer: boolean, maximizingPlayer: string, blackKingIndex: number, whiteKingIndex: number, mainCall: boolean): number {

        if (depth === 0) return this.getStaticBoardValue(board, maximizingPlayer);

        if (isMaximizingPlayer) {

            let maxScore = -1000

            for (let i = 0; i < board.length; i++) {

                const currentPiece = board[i];

                if (currentPiece.color === maximizingPlayer) {

                    let moves = this.movesUtil.getValidMoves(i, maximizingPlayer, blackKingIndex, whiteKingIndex, board);

                    for (let j = 0; j < moves.length; j++) {

                        const currentMove = moves[j];

                        let originalSource = board[i];
                        let originalDestination = board[currentMove];
                        let originalBlackKingIndex = blackKingIndex;
                        let originalWhiteKingIndex = whiteKingIndex;

                        if (currentPiece.type === Constants.KING) {

                            if (currentPiece.color === Constants.PIECE_COLOR_BLACK) {
                                blackKingIndex = currentMove;
                            } else {
                                whiteKingIndex = currentMove;
                            }

                        }

                        this.movesUtil.mockMove(i, currentMove, board);

                        const score = this.minimax(board, depth - 1, false, maximizingPlayer, blackKingIndex, whiteKingIndex, false);

                        if (score > maxScore) {
                            maxScore = score;

                            if (mainCall)
                                this.optimalMove = [i, currentMove];
                        }

                        board[i] = originalSource;
                        board[currentMove] = originalDestination;
                        blackKingIndex = originalBlackKingIndex;
                        whiteKingIndex = originalWhiteKingIndex;
                    }
                }

            }

            return maxScore;

        } else {

            let minScore = 1000

            for (let i = 0; i < board.length; i++) {

                const currentPiece = board[i];

                if (currentPiece.unicode !== '' && currentPiece.color !== maximizingPlayer) {

                    const opponent = maximizingPlayer === Constants.PIECE_COLOR_BLACK ? Constants.PIECE_COLOR_WHITE : Constants.PIECE_COLOR_BLACK;

                    let moves = this.movesUtil.getValidMoves(i, opponent, blackKingIndex, whiteKingIndex, board);

                    for (let j = 0; j < moves.length; j++) {

                        const currentMove = moves[j];

                        let originalSource = board[i];
                        let originalDestination = board[currentMove];
                        let originalBlackKingIndex = blackKingIndex;
                        let originalWhiteKingIndex = whiteKingIndex;

                        if (currentPiece.type === Constants.KING) {

                            if (currentPiece.color === Constants.PIECE_COLOR_BLACK) {
                                blackKingIndex = currentMove;
                            } else {
                                whiteKingIndex = currentMove;
                            }

                        }

                        this.movesUtil.mockMove(i, currentMove, board);

                        const score = this.minimax(board, depth - 1, true, maximizingPlayer, blackKingIndex, whiteKingIndex, false);

                        if (score < minScore) {
                            minScore = score;
                        }

                        board[i] = originalSource;
                        board[currentMove] = originalDestination;
                        blackKingIndex = originalBlackKingIndex;
                        whiteKingIndex = originalWhiteKingIndex;
                    }
                }

            }

            return minScore;
        }

    }

    getStaticBoardValue(board: Piece[], currentPlayer: string): number {

        let value = 0;

        for (let i = 0; i < board.length; i++) {

            if (currentPlayer === board[i].color) {
                value += board[i].value;
            } else {
                value -= board[i].value;
            }

        }
        return value;


    }

}