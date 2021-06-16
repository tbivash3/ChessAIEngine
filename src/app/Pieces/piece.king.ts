import { Piece } from "../model/piece";
import { BoardUtil } from "../utility/board.util";

export class King {
    static blackUnicode = "\u265A";

    static whiteUnicode = "\u2654";

    static KING = 'KG';

    static relativeMovesPair = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [-1, -1], [1, -1]];

    static getMoves(index: number, board: Piece[], kingColor: string): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        let tempRow = 0;

        let tempColumn = 0;

        let piece = board[index];

        King.relativeMovesPair.forEach(move => {

            tempRow = row + move[0];
            tempColumn = column + move[1];

            if (!(tempRow < 0 || tempRow > 7 || tempColumn < 0 || tempColumn > 7)) {

                const validMovePosition = index + (8 * move[0]) + move[1];

                piece = board[validMovePosition];

                if (piece.unicode === '' || piece.color !== kingColor)
                    moves.push(validMovePosition);
            }

        })

        return moves;

    }
}