import { BoardUtil } from "../utility/board.util";

export class Knight {
    static blackKnightUnicode = "\u265E";

    static whiteKnightUnicode = "\u2658";

    static relativeMovesPair = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];

    static getMoves(index: number, board: string[][], knightType: string): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        let tempRow = 0;

        let tempColumn = 0;

        Knight.relativeMovesPair.forEach(move => {

            tempRow = row + move[0];
            tempColumn = column + move[1];

            if (!(tempRow < 0 || tempRow > 7 || tempColumn < 0 || tempColumn > 7)) {

                const validMovePosition = index + (8 * move[0]) + move[1];

                if (board[validMovePosition][0] === '' || board[validMovePosition][1] !== knightType)
                    moves.push(validMovePosition);
            }

        })

        return moves;

    }
}