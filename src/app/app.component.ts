import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Constants } from './model/constants';
import { Piece } from './model/piece';
import { King } from './pieces/piece.king';

import { BoardUtil } from './utility/board.util';
import { MovesUtil } from './utility/moves.util';
import { MatDialog } from '@angular/material/dialog';
import { Minimax } from './utility/minimax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  blackKingIndex = Constants.BLACK_KING_INITIAL_INDEX;

  whiteKingIndex = Constants.WHTE_KING_INITIAL_INDEX;

  numOfBoxes: number[] = [];

  boardConfiguration: Piece[] = [];

  blackDeadPiecesContainer: string[] = [];

  whiteDeadPiecesContainer: string[] = [];

  validMoves: number[] = [];

  validMovesSet: Set<number> = new Set();

  currentPlayer = '';

  recentMoveIndex = [-1, -1];

  currentBoxIndex = -1;

  gameOverText = '';

  playMode = -1;

  gameStarted = 0;

  pieceSelectedIndex = -1;

  constructor(private movesUtil: MovesUtil, private gameOverDialog: MatDialog, private minimax: Minimax) { }

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit() {
    this.numOfBoxes = Array.from(Array(64).keys())
    this.boardConfiguration = BoardUtil.getInitialBoardConfiguration();
  }

  async botTurn() {

    await new Promise((r) => setTimeout(r, 100));

    let optimalMove = this.minimax.findBestMove(this.boardConfiguration, 4, this.currentPlayer, this.blackKingIndex, this.whiteKingIndex);

    this.updateBoard(optimalMove[0], optimalMove[1]);
  }

  findDestinationIndex(moves: number[]) {

    let destinationIndex = moves[0];

    for (let i = 0; i < moves.length; i++) {

      if (this.boardConfiguration[moves[i]].unicode !== '') {
        destinationIndex = moves[i];
        break;
      }

    }

    return destinationIndex;

  }

  dragStart(event: any, index: number) {
    this.resetValidMovesSet();

    const currentPiece = this.boardConfiguration[index];
    const pieceColor = currentPiece.color;

    if (pieceColor === this.currentPlayer) {

      this.selectPiece(index);

    } else {

      event.preventDefault();

    }
  }

  selectPiece(index: number) {
    this.resetValidMovesSet();

    const currentPiece = this.boardConfiguration[index];
    const pieceColor = currentPiece.color;

    if (pieceColor === this.currentPlayer) {

      this.currentBoxIndex = index;
      this.validMoves = this.movesUtil.getValidMoves(index, this.currentPlayer, this.blackKingIndex, this.whiteKingIndex, this.boardConfiguration);
      this.validMovesSet = new Set(this.validMoves);

    }
  }

  drop(event: any, destinationIndex: number) {
    event.preventDefault();
    this.executeMove(destinationIndex);
  }

  executeMove(destinationIndex: number) {
    let isDestinationIndexValid = this.checkIfDestinationIndexIsValid(destinationIndex);

    if (isDestinationIndexValid) {
      this.updateBoard(this.currentBoxIndex, destinationIndex);

      if (this.playMode === 0)
        this.botTurn();
    }
  }

  pieceClick(index: number) {

    this.executeMove(index);

    this.selectPiece(index);

  }

  updateBoard(sourceIndex: number, destinationIndex: number) {

    const sourcePieceUnicode = this.boardConfiguration[sourceIndex].unicode;

    const destinationPiece = this.boardConfiguration[destinationIndex];

    this.boardConfiguration[destinationIndex] = this.boardConfiguration[sourceIndex];

    this.boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '', value: 0 };

    this.recentMoveIndex = [sourceIndex, destinationIndex];

    this.setDeadPieceContainerArray(destinationPiece);

    this.updateKingsIndex(sourcePieceUnicode, destinationIndex);

    this.checkIfGameOver();

    this.switchPlayer();

  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  dragEnd(event: any) {
    event.preventDefault();
    this.resetLastMove();
  }

  resetLastMove() {
    this.resetValidMovesSet();
    this.currentBoxIndex = -1;
  }

  selectPlayMode(mode: number) {
    this.playMode = mode;
  }

  startGame() {

    this.initGameConfig();
    this.gameStarted = 1;
    if (this.playMode === 0) {
      this.botTurn();
    }

  }

  checkIfGameOver() {
    let noOpponentMovesLeft = true;

    const opponentPlayer = this.currentPlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;

    for (let i = 0; i < this.boardConfiguration.length; i++) {

      const piece = this.boardConfiguration[i];

      if (piece.color == opponentPlayer) {

        let validMoves = this.movesUtil.getValidMoves(i, opponentPlayer, this.blackKingIndex, this.whiteKingIndex, this.boardConfiguration);

        if (validMoves.length > 0) {
          noOpponentMovesLeft = false;
          break;
        }
      }
    }

    let areOnlyKingsLeft = this.checkIfOnlyKingsLeft();

    if (noOpponentMovesLeft || (!noOpponentMovesLeft && areOnlyKingsLeft)) {

      let isOpponentKingInCheck = this.checkIsOpponentKingIsInCheck();

      this.gameOverText = isOpponentKingInCheck ? this.currentPlayer : 'S';

      this.playMode = -1;

      this.gameStarted = 0;
    }
  }

  checkIfOnlyKingsLeft() {
    let totalPiece = 0;

    for (let i = 0; i < this.boardConfiguration.length; i++) {

      if (this.boardConfiguration[i].unicode !== '') {
        totalPiece++;
      }

      if (totalPiece > 2) break;
    }


    return totalPiece === 2 ? true : false;
  }

  checkIsOpponentKingIsInCheck() {

    let isInCheck = false;

    let opponentKingIndex = this.currentPlayer === Constants.PLAYER_ONE ? this.whiteKingIndex : this.blackKingIndex;

    for (let i = 0; i < this.boardConfiguration.length; i++) {

      let isKingInCheck = false;

      if (this.boardConfiguration[i].color === this.currentPlayer) {

        let moves = this.movesUtil.getIndividualPieceMoves(i, this.boardConfiguration);

        for (let j = 0; j < moves.length; j++) {

          if (moves[j] === opponentKingIndex) {
            isKingInCheck = true;
            break;
          }

        }

      }

      if (isKingInCheck) {
        isInCheck = true;
        break;
      }

    }
    return isInCheck;
  }


  initGameConfig() {
    this.validMoves = [];

    this.boardConfiguration = BoardUtil.getInitialBoardConfiguration();

    this.blackKingIndex = Constants.BLACK_KING_INITIAL_INDEX;

    this.whiteKingIndex = Constants.WHTE_KING_INITIAL_INDEX;

    this.currentPlayer = Constants.PLAYER_ONE;

    this.blackDeadPiecesContainer = [];

    this.whiteDeadPiecesContainer = [];

    this.recentMoveIndex = [-1, -1];

    this.currentBoxIndex = -1;

    this.gameOverText = '';
  }

  updateKingsIndex(sourcePieceUnicode: string, destinationIndex: number) {
    if (sourcePieceUnicode === King.blackUnicode) {
      this.blackKingIndex = destinationIndex;
    }

    if (sourcePieceUnicode === King.whiteUnicode) {
      this.whiteKingIndex = destinationIndex;
    }
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;
  }

  setDeadPieceContainerArray(piece: Piece) {
    if (piece.unicode !== '') {
      const color = piece.color;

      let arr = this.blackDeadPiecesContainer;

      if (color === Constants.PIECE_COLOR_WHITE) {
        arr = this.whiteDeadPiecesContainer;
      }

      arr.push(piece.unicode);
    }
  }

  checkIfDestinationIndexIsValid(destinationIndex: number): boolean {

    let isValid = false;

    this.validMoves.forEach(index => {
      if (index === destinationIndex) {
        isValid = true;
      }
    })

    return isValid;
  }

  resetValidMovesSet() {
    this.validMovesSet.clear();
  }

  getBackgroundColor(index: number) {
    return BoardUtil.getBackgroundColor(index);
  }
}
