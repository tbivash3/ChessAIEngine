import { Piece } from "./piece";

export class WhiteRook implements Piece {
    unicode = "\u2656";

    getMoves(): number[] {
        return [];
    }

}