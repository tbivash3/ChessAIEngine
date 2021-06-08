import { Bishop } from "./bishop";
import { Rook } from "./Rook";

export class Queen {
    static blackQueenUnicode = "\u265B";

    static whiteQueenUnicode = "\u2655";

    static getMoves(index: number, board: string[][], QueenType: string): number[] {

        let rookMoves = Rook.getMoves(index, board, QueenType);

        let bishopMoves = Bishop.getMoves(index, board, QueenType);

        return rookMoves.concat(bishopMoves);

    }
}