import { BoardUtil } from "../utility/board.util";

export class WhiteKnight {
    static unicode = "\u2658";

    static relativeMovesPair = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];

    static getMoves(index: number, board: string[][]): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        let tempRow = 0;

        let tempColumn = 0;

        WhiteKnight.relativeMovesPair.forEach(move => {

            tempRow = row + move[0];
            tempColumn = column + move[1];

            if (!(tempRow < 0 || tempRow > 7 || tempColumn < 0 || tempColumn > 7)) {

                const validMovePosition = index + (8 * move[0]) + move[1];

                if (board[validMovePosition][0] === '' || board[validMovePosition][1] === 'B')
                    moves.push(validMovePosition);
            }

        })

        console.log(moves);

        return moves;

    }
}