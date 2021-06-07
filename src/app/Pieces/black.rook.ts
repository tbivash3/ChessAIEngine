import { BoardUtil } from "../utility/board.util";

export class BlackRook {
    static unicode = "\u265C";

    static getMoves(index: number, board: string[][]): number[] {
        let moves: number[] = [];


        const row = BoardUtil.getRowNumber(index);
        const column = BoardUtil.getColumnNumber(index);

        let tempPosition = 0;

        // Down Row
        for (let i = row + 1; i < 8; i++) {

            tempPosition = index + (i - row) * 8;

            if (board[tempPosition][0] === '') {
                moves.push(tempPosition);
            } else if (board[tempPosition][1] === 'W') {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }

        // Up Row
        for (let i = row - 1; i >= 0; i--) {

            tempPosition = index - (row - i) * 8;

            if (board[tempPosition][0] === '') {
                moves.push(tempPosition);
            } else if (board[tempPosition][1] === 'W') {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }

        // Right Column
        for (let i = column + 1; i < 8; i++) {

            tempPosition = index + (i - column);

            if (board[tempPosition][0] === '') {
                moves.push(tempPosition);
            } else if (board[tempPosition][1] === 'W') {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }

        // Left Column
        for (let i = column - 1; i >= 0; i--) {

            tempPosition = index - (column - i);

            if (board[tempPosition][0] === '') {
                moves.push(tempPosition);
            } else if (board[tempPosition][1] === 'W') {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }
        return moves;
    }

}