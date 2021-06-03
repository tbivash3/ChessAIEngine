import { Piece } from "./model/piece";

export class BlackQueen implements Piece {
    unicode = "\u265B";

    getMoves(): number[] {
        return [];
    }

}