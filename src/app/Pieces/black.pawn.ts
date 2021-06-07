import { BoardUtil } from "../utility/board.util";
import { Piece } from "./model/piece";

export class BlackPawn {

    constructor(private boardUtil: BoardUtil) { }

    static unicode = "\u265F";

    static getMoves(index: number, board: Map<number, string>) {

        const row = BoardUtil.getRowNumber(index);

        let moves: Set<number> = new Set();

        const frontMove = index + 8;

        const leftDiagonalMove = frontMove - 1;

        const rightDiagonalMove = frontMove + 1;

        // check front move
        if (board.get(frontMove) !== '') moves.add(frontMove);

        //check left diagonal move
        if (BoardUtil.getRowNumber(leftDiagonalMove) === row) moves.add(leftDiagonalMove);

        //check right diagonal move
        if (BoardUtil.getRowNumber(rightDiagonalMove) === row) moves.add(rightDiagonalMove);

        // check if first pawn move --- check front move for second position
        if (row === 1) {
            const secondFrontMove = frontMove + 8;
            if (board.get(secondFrontMove) !== '') moves.add(frontMove);
        }

        return moves;
    }

}