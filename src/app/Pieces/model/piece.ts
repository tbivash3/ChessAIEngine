export interface Piece {
    unicode: string,
    getMoves(index: number, board: Map<number, string>): number[],
}