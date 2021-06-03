export interface Piece {
    unicode: string,
    getMoves(): number[],
}