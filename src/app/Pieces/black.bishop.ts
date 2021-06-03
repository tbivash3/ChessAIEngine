import { Piece } from "./model/piece";

export class BlackBishop implements Piece {
    unicode = "\u265D";

    getMoves(): number[] {
        return [];
    }

}