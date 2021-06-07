import { BoardUtil } from "../utility/board.util";

export class BlackPawn {

    constructor() { }

    static unicode = "\u265F";

    static getMoves(index: number, board: string[][]) {

        const row = BoardUtil.getRowNumber(index);

        console.log(row);

        let moves: number[] = [];

        const frontMove = index + 8;

        const leftDiagonalMove = frontMove - 1;

        const rightDiagonalMove = frontMove + 1;

        // check front move
        if (board[frontMove][0] === '') moves.push(frontMove);

        //check left diagonal move
        if (BoardUtil.getRowNumber(leftDiagonalMove) === row + 1 && board[leftDiagonalMove][0] !== '' && board[leftDiagonalMove][1] !== 'B') moves.push(leftDiagonalMove);

        //check right diagonal move
        if (BoardUtil.getRowNumber(rightDiagonalMove) === row + 1 && board[rightDiagonalMove][0] !== '' && board[rightDiagonalMove][1] !== 'B') moves.push(rightDiagonalMove);

        // check if first row pawn move --- check front move for second position
        if (row === 1) {
            const secondFrontMove = frontMove + 8;
            if (board[secondFrontMove][0] === '') moves.push(secondFrontMove);
        }

        return moves;
    }

}