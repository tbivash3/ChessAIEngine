import { Piece } from "../model/piece";
import { Bishop } from "./piece.bishop";
import { Rook } from "./piece.rook";

export class Queen {
    static blackUnicode = "\u265B";

    static whiteUnicode = "\u2655";

    static QUEEN = "Q";

    static value = "500";

    static getMoves(index: number, board: Piece[], QueenType: string): number[] {

        let rookMoves = Rook.getMoves(index, board, QueenType);

        let bishopMoves = Bishop.getMoves(index, board, QueenType);

        return rookMoves.concat(bishopMoves);

    }
}