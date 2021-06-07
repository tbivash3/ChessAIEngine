import { BoardUtil } from "../utility/board.util";

export class Pawn {
    static whitePawnUnicode = "\u2659";

    static blackPawnUnicode = "\u265F";

    static getMoves(index: number, board: string[][], pawnType: string) {
        let moves: number[] = [];

        if (pawnType === 'B') {

            this.getPawnMovesByColor(index, board, moves, 8, 1, pawnType);
        } else {
            this.getPawnMovesByColor(index, board, moves, -8, -1, pawnType);
        }

        return moves;
    }

    static getPawnMovesByColor(index: number, board: string[][], moves: number[], rowAdjuster: number, columnAdjuster: number, pawnType: string) {
        const row = BoardUtil.getRowNumber(index);

        const frontMove = index + rowAdjuster;

        const leftDiagonalMove = frontMove - 1;

        const rightDiagonalMove = frontMove + 1;

        // check front move
        if (board[frontMove][0] === '') moves.push(frontMove);

        //check left diagonal move
        if (BoardUtil.getRowNumber(leftDiagonalMove) === row + columnAdjuster && board[leftDiagonalMove][0] !== '' && board[leftDiagonalMove][1] !== pawnType) moves.push(leftDiagonalMove);

        //check right diagonal move
        if (BoardUtil.getRowNumber(rightDiagonalMove) === row + columnAdjuster && board[rightDiagonalMove][0] !== '' && board[rightDiagonalMove][1] !== pawnType) moves.push(rightDiagonalMove);

        // check if first row pawn move --- check front move for second position
        if ((row === 6 && pawnType === 'W') || (row === 1 && pawnType === 'B')) {
            const secondFrontMove = frontMove + rowAdjuster;
            if (board[secondFrontMove][0] === '' && board[frontMove][0] === '') moves.push(secondFrontMove);
        }

    }
}