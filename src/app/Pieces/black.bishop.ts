import { BoardUtil } from "../utility/board.util";

export class BlackBishop {
    static unicode = "\u265D";

    static getMoves(index: number, board: string[][]): number[] {

        let moves: number[] = [];

        const row = BoardUtil.getRowNumber(index);

        const column = BoardUtil.getColumnNumber(index);

        return moves;
    }

}