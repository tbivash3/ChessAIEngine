import { BoardUtil } from "../utility/board.util";

export class Bishop {
    static blackBishopUnicode = "\u265D";

    static whiteBishopUnicode = "\u2657";

    static getMoves(index: number, board: string[][], bishopType: string): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        let tempRow = row + 1

        let tempColumn = column + 1;

        //Down Right

        while (tempRow < 8 && tempColumn < 8) {

            const boardIndex = index + 8 * (tempRow - row) + (tempColumn - column);

            if (board[boardIndex][0] === '') {
                moves.push(boardIndex);
            } else if (board[boardIndex][1] !== bishopType) {
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

            if (board[boardIndex][0] === '') {
                moves.push(boardIndex);
            } else if (board[boardIndex][1] !== bishopType) {
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

            if (board[boardIndex][0] === '') {
                moves.push(boardIndex);
            } else if (board[boardIndex][1] !== bishopType) {
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

            if (board[boardIndex][0] === '') {
                moves.push(boardIndex);
            } else if (board[boardIndex][1] !== bishopType) {
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