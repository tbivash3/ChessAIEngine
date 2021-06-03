import { Piece } from "./piece";

export class BlackPawn implements Piece {
    unicode = "\u265F";

    getMoves(): number[] {
        return [];
    }

}