import { Piece } from "../model/piece";
import { BoardUtil } from "../utility/board.util";

export class Bishop {
    static blackUnicode = "\u265D";

    static whiteUnicode = "\u2657";

    static BISHOP = "B";

    static value = "30";

    static getMoves(index: number, board: Piece[], bishopColor: string): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        let tempRow = row + 1

        let tempColumn = column + 1;

        let piece = board[index];

        //Down Right

        while (tempRow < 8 && tempColumn < 8) {

            const boardIndex = index + 8 * (tempRow - row) + (tempColumn - column);

            piece = board[boardIndex];
            if (piece.unicode === '') {
                moves.push(boardIndex);
            } else if (piece.color !== bishopColor) {
                moves.push(boardIndex);
                break;
            } else {
                break;
            }

            tempRow++;
            tempColumn++;
        }




        //Down Left

        tempRow = row + 1

        tempColumn = column - 1;

        while (tempRow < 8 && tempColumn >= 0) {

            const boardIndex = index + 8 * (tempRow - row) - (column - tempColumn);
            piece = board[boardIndex];
            if (piece.unicode === '') {
                moves.push(boardIndex);
            } else if (piece.color !== bishopColor) {
                moves.push(boardIndex);
                break;
            } else {
                break;
            }

            tempRow++;
            tempColumn--;
        }

        //Up Right
        tempRow = row - 1

        tempColumn = column + 1;

        while (tempRow >= 0 && tempColumn < 8) {

            const boardIndex = index - 8 * (row - tempRow) + (tempColumn - column);
            piece = board[boardIndex];
            if (piece.unicode === '') {
                moves.push(boardIndex);
            } else if (piece.color !== bishopColor) {
                moves.push(boardIndex);
                break;
            } else {
                break;
            }

            tempRow--;
            tempColumn++;
        }

        //Up Left
        tempRow = row - 1

        tempColumn = column - 1;

        while (tempRow >= 0 && tempColumn >= 0) {

            const boardIndex = index - 8 * (row - tempRow) - (column - tempColumn);
            piece = board[boardIndex];
            if (piece.unicode === '') {
                moves.push(boardIndex);
            } else if (piece.color !== bishopColor) {
                moves.push(boardIndex);
                break;
            } else {
                break;
            }

            tempRow--;
            tempColumn--;
        }

        return moves;
    }

}