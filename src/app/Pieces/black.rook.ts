import { Piece } from "./model/piece";

export class BlackRook implements Piece {
    public unicode = "\u265C";

    public getMoves(): number[] {
        return [];
    }

}