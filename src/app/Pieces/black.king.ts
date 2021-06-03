import { Piece } from "./model/piece";

export class BlackKing implements Piece {
    unicode = "\u265A";

    getMoves(): number[] {
        return [];
    }

}