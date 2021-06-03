import { Piece } from "./model/piece";

export class WhiteBishop implements Piece {
    unicode = "\u2657";

    getMoves(): number[] {
        return [];
    }

}