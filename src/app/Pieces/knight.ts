import { Piece } from "../model/Piece";
import { BoardUtil } from "../utility/board.util";

export class Knight {
    static blackKnightUnicode = "\u265E";

    static whiteKnightUnicode = "\u2658";

    static relativeMovesPair = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];

    static getMoves(index: number, board: Piece[], knightColor: string): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        let tempRow = 0;

        let tempColumn = 0;

        let piece = board[index];

        Knight.relativeMovesPair.forEach(move => {

            tempRow = row + move[0];
            tempColumn = column + move[1];

            if (!(tempRow < 0 || tempRow > 7 || tempColumn < 0 || tempColumn > 7)) {

                const validMovePosition = index + (8 * move[0]) + move[1];

                piece = board[validMovePosition];

                if (piece.unicode === '' || piece.color !== knightColor)
                    moves.push(validMovePosition);
            }

        })

        return moves;

    }
}