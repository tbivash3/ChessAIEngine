import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Constants } from './model/constants';
import { Piece } from './model/piece';
import { King } from './pieces/piece.king';

import { BoardUtil } from './utility/board.util';
import { MovesUtil } from './utility/moves.uti';
import { MatDialog } from '@angular/material/dialog';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  blackKingIndex = Constants.BLACK_KING_INITIAL_INDEX;

  whiteKingIndex = Constants.WHTE_KING_INITIAL_INDEX;

  piecesStartIndexInDeadContainer = Constants.getPiecesStartIndex();

  numOfBoxes: number[] = [];

  boardConfiguration: Piece[] = [];

  blackDeadPiecesContainer = new Array<Piece>(16);

  whiteDeadPiecesContainer = new Array<Piece>(16);

  validMoves: number[] = [];

  validMovesSet: Set<number> = new Set();

  currentPlayer = Constants.PLAYER_ONE;

  recentMoveIndex = [-1, -1];

  currentBoxIndex = -1;

  gameOverText = '';

  constructor(private movesUtil: MovesUtil, private gameOverDialog: MatDialog) { }

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {

    this.resetGame();

    this.numOfBoxes = Array.from(Array(64).keys())

    this.boardConfiguration = BoardUtil.getInitialBoardConfiguration();

    this.botTurn();
  }

  async botTurn() {

    let allBlackIndex: number[] = [];

    for (let i = 0; i < this.boardConfiguration.length; i++) {
      if (this.boardConfiguration[i].color === Constants.PIECE_COLOR_BLACK) {
        allBlackIndex.push(i);
      }
    }

    let sourceIndex = Math.floor(Math.random() * allBlackIndex.length);

    sourceIndex = allBlackIndex[sourceIndex];

    let moves = this.movesUtil.getValidMoves(sourceIndex, this.currentPlayer, this.blackKingIndex, this.whiteKingIndex, this.boardConfiguration);

    if (moves.length !== 0) {

      let destinationIndex = this.findDestinationIndex(moves);

      this.updateBoard(sourceIndex, destinationIndex);

    } else {
      this.botTurn();
    }
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

      this.currentBoxIndex = index;
      this.validMoves = this.movesUtil.getValidMoves(index, this.currentPlayer, this.blackKingIndex, this.whiteKingIndex, this.boardConfiguration);
      this.validMovesSet = new Set(this.validMoves);

    } else {

      event.preventDefault();

    }
  }



  drop(event: any, destinationIndex: number) {

    event.preventDefault();
    let isDestinationIndexValid = this.checkIfDestinationIndexIsValid(destinationIndex);

    if (isDestinationIndexValid) {
      this.updateBoard(this.currentBoxIndex, destinationIndex);
      this.botTurn();
    }
  }

  updateBoard(sourceIndex: number, destinationIndex: number) {

    const sourcePiece = this.boardConfiguration[sourceIndex];

    const destinationPiece = this.boardConfiguration[destinationIndex];

    this.boardConfiguration[destinationIndex] = sourcePiece;

    this.boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '' };

    this.recentMoveIndex = [sourceIndex, destinationIndex];

    this.setDeadPieceContainerArray(destinationPiece);

    this.updateKingsIndex(sourcePiece, destinationIndex);

    this.checkIfGameOver();

    this.switchPlayer();

  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  dragEnd(event: any) {
    event.preventDefault();
    this.resetValidMovesSet();
    this.currentBoxIndex = -1;
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

    let isOpponentKingInCheck = this.checkIsOpponentKingIsInCheck();

    if (noOpponentMovesLeft) {

      this.gameOverText = isOpponentKingInCheck ? this.currentPlayer : 'S';

      let dialogRef = this.gameOverDialog.open(GameOverDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.resetGame();
        }
      })
    }
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


  resetGame() {
    this.validMoves = [];
    this.boardConfiguration = BoardUtil.getInitialBoardConfiguration();
    this.blackKingIndex = Constants.BLACK_KING_INITIAL_INDEX;

    this.whiteKingIndex = Constants.WHTE_KING_INITIAL_INDEX;

    this.piecesStartIndexInDeadContainer = Constants.getPiecesStartIndex();

    const emptyPiece = { color: '', type: '', unicode: '', index: -1 };

    this.blackDeadPiecesContainer.fill(emptyPiece);

    this.whiteDeadPiecesContainer.fill(emptyPiece);

    this.currentPlayer = Constants.PLAYER_ONE;

    this.recentMoveIndex = [-1, -1];

    this.currentBoxIndex = -1;

    this.gameOverText = '';
  }

  updateKingsIndex(sourcePiece: Piece, destinationIndex: number) {
    if (sourcePiece.unicode === King.blackKingUnicode) {
      this.blackKingIndex = destinationIndex;
    }

    if (sourcePiece.unicode === King.whiteKingUnicode) {
      this.whiteKingIndex = destinationIndex;
    }
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;
  }

  setDeadPieceContainerArray(piece: Piece) {
    if (piece.unicode !== '') {
      const color = piece.color;
      const type = piece.type;

      let arr = this.blackDeadPiecesContainer;

      if (color === Constants.PIECE_COLOR_WHITE) {
        arr = this.whiteDeadPiecesContainer;
      }

      let index = this.getAndUpdatePieceIndex(type);

      arr[index] = piece;
    }
  }

  getAndUpdatePieceIndex(type: string) {

    let index = -1;

    let pos = 0;

    const indexArr = this.piecesStartIndexInDeadContainer.get(type) || [0, 1];

    if (this.currentPlayer === Constants.PLAYER_TWO) pos = 1;

    index = indexArr[pos];

    indexArr[pos]++;

    this.piecesStartIndexInDeadContainer.set(type, indexArr);

    return index;
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
