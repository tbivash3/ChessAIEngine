import { Piece } from "./model/piece";

export class WhitePawn implements Piece {
    unicode = "\u2659";

    getMoves(): number[] {
        return [];
    }

}