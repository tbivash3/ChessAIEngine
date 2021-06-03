import { Piece } from "./model/piece";

export class WhiteQueen implements Piece {
    unicode = "\u2655";

    getMoves(): number[] {
        return [];
    }

}