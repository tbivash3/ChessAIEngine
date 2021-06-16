import { Piece } from "../model/piece";

export class Minimax {


    minimax(board: Piece[], depth: number, isMaximizingPlayer: boolean, maximizingPlayer: string) {

        if (depth === 0) return this.getStaticBoardValue(board, maximizingPlayer);

    }




    getStaticBoardValue(board: Piece[], currentPlayer: string) {

        return Math.floor(Math.random() * 100);

    }

}