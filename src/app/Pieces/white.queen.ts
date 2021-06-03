import { Piece } from "./piece";

export class WhiteQueen implements Piece {
    unicode = "\u2655";

    getMoves(): number[] {
        return [];
    }

}