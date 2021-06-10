import { Piece } from "../model/Piece";
import { Bishop } from "./bishop";
import { Rook } from "./Rook";

export class Queen {
    static blackQueenUnicode = "\u265B";

    static whiteQueenUnicode = "\u2655";

    static QUEEN = "Q";

    static getMoves(index: number, board: Piece[], QueenType: string): number[] {

        let rookMoves = Rook.getMoves(index, board, QueenType);

        let bishopMoves = Bishop.getMoves(index, board, QueenType);

        return rookMoves.concat(bishopMoves);

    }
}