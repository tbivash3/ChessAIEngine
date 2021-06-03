import { Piece } from "./piece";

export class WhiteKnight implements Piece {
    unicode = "\u2658";

    getMoves(): number[] {
        return [];
    }

}