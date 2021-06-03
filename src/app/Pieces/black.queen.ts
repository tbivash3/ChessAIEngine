import { Piece } from "./piece";

export class BlackQueen implements Piece {
    unicode = "\u265B";

    getMoves(): number[] {
        return [];
    }

}