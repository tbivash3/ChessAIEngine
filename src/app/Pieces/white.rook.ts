import { Piece } from "./piece";

export class WhiteRook implements Piece {
    unicode = "\u265C";

    getMoves(): number[] {
        return [];
    }

}