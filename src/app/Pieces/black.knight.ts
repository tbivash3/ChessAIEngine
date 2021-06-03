import { Piece } from "./model/piece";

export class BlackKnight implements Piece {
    unicode = "\u265E";

    getMoves(): number[] {
        return [];
    }

}