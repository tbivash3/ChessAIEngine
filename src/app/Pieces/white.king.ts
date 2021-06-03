import { Piece } from "./piece";

export class WhiteKing implements Piece {
    unicode = "\u2654";

    getMoves(): number[] {
        return [];
    }

}