import { Piece } from "./model/piece";

export class WhiteRook implements Piece {
    unicode = "\u2656";

    getMoves(): number[] {
        return [];
    }

}