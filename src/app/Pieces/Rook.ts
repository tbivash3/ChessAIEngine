import { Piece } from "../model/Piece";
import { BoardUtil } from "../utility/board.util";

export class Rook {
    static blackRookUnicode = "\u265C";

    static whiteRookUnicode = "\u2656";

    static getMoves(index: number, board: Piece[], rookType: string): number[] {
        let moves: number[] = [];


        const row = BoardUtil.getRowNumber(index);
        const column = BoardUtil.getColumnNumber(index);

        let piece = board[index];

        let tempPosition = 0;

        // Down Row
        for (let i = row + 1; i < 8; i++) {

            tempPosition = index + (i - row) * 8;

            piece = board[tempPosition];

            if (piece.unicode === '') {
                moves.push(tempPosition);
            } else if (piece.color !== rookType) {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }

        // Up Row
        for (let i = row - 1; i >= 0; i--) {

            tempPosition = index - (row - i) * 8;

            piece = board[tempPosition];
            if (piece.unicode === '') {
                moves.push(tempPosition);
            } else if (piece.color !== rookType) {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }

        // Right Column
        for (let i = column + 1; i < 8; i++) {

            tempPosition = index + (i - column);

            if (piece.unicode === '') {
                moves.push(tempPosition);
            } else if (piece.color !== rookType) {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }

        // Left Column
        for (let i = column - 1; i >= 0; i--) {

            tempPosition = index - (column - i);

            piece = board[tempPosition];
            if (piece.unicode === '') {
                moves.push(tempPosition);
            } else if (piece.color !== rookType) {
                moves.push(tempPosition);
                break;
            } else {
                break;
            }
        }
        return moves;
    }

}