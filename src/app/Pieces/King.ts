import { BoardUtil } from "../utility/board.util";

export class King {
    static blackKingUnicode = "\u265A";

    static whiteKingUnicode = "\u2654";

    static relativeMovesPair = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [-1, -1], [1, -1]];

    static getMoves(index: number, board: string[][], kingType: string): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        let tempRow = 0;

        let tempColumn = 0;

        King.relativeMovesPair.forEach(move => {

            tempRow = row + move[0];
            tempColumn = column + move[1];

            if (!(tempRow < 0 || tempRow > 7 || tempColumn < 0 || tempColumn > 7)) {

                const validMovePosition = index + (8 * move[0]) + move[1];

                if (board[validMovePosition][0] === '' || board[validMovePosition][1] !== kingType)
                    moves.push(validMovePosition);
            }

        })

        return moves;

    }
}