import { PieceColor } from "./piece.color";
import { PieceType } from "./piece.type";

export interface Piece {
    index: number,
    color: string,
    type: string,
    unicode: string
}