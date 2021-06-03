import { Piece } from "./model/piece";

export class WhiteKing implements Piece {
    unicode = "\u2654";

    getMoves(): number[] {
        return [];
    }

}