import { Piece } from "../model/Piece";
import { BoardUtil } from "../utility/board.util";

export class Pawn {
    static whitePawnUnicode = "\u2659";

    static blackPawnUnicode = "\u265F";

    static getMoves(index: number, board: Piece[], pawnColor: string) {
        let moves: number[] = [];

        if (pawnColor === 'B') {
            this.getPawnMovesByColor(index, board, moves, 8, 1, pawnColor);
        } else {
            this.getPawnMovesByColor(index, board, moves, -8, -1, pawnColor);
        }

        return moves;
    }

    static getPawnMovesByColor(index: number, board: Piece[], moves: number[], rowAdjuster: number, columnAdjuster: number, pawnColor: string) {
        const row = BoardUtil.getRowNumber(index);

        const frontMove = index + rowAdjuster;

        const leftDiagonalMove = frontMove - 1;

        const rightDiagonalMove = frontMove + 1;

        let piece = board[index];

        // check front move
        piece = board[frontMove];
        if (piece.unicode === '') moves.push(frontMove);

        //check left diagonal move
        piece = board[leftDiagonalMove];
        if (BoardUtil.getRowNumber(leftDiagonalMove) === row + columnAdjuster && piece.unicode !== '' && piece.color !== pawnColor) moves.push(leftDiagonalMove);

        //check right diagonal move
        piece = board[rightDiagonalMove];
        if (BoardUtil.getRowNumber(rightDiagonalMove) === row + columnAdjuster && piece.unicode !== '' && piece.color !== pawnColor) moves.push(rightDiagonalMove);

        // check if first row pawn move --- check front move for second position
        if ((row === 6 && pawnColor === 'W') || (row === 1 && pawnColor === 'B')) {
            const secondFrontMove = frontMove + rowAdjuster;
            const secondPiece = board[secondFrontMove];
            if (secondPiece.unicode === '' && piece.unicode === '') moves.push(secondFrontMove);
        }

    }
}