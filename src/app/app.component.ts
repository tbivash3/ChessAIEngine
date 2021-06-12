import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Constants } from './model/constants';
import { Piece } from './model/piece';
import { King } from './Pieces/piece.king';

import { BoardUtil } from './utility/board.util';
import { MovesUtil } from './utility/moves.uti';

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

  deadContainerIndex: number[][] = [];

  validMoves: number[] = [];

  validMovesSet: Set<number> = new Set();

  currentPlayer = Constants.PLAYER_ONE;

  recentMoveIndex = [-1, -1];

  currentBoxIndex = -1;

  winner = '';

  constructor(private movesUtil: MovesUtil) { }

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {

    const emptyPiece = { color: '', type: '', unicode: '', index: -1 };

    this.blackDeadPiecesContainer.fill(emptyPiece);

    this.whiteDeadPiecesContainer.fill(emptyPiece);

    this.numOfBoxes = Array.from(Array(64).keys())

    this.boardConfiguration = BoardUtil.getInitialBoardConfiguration();
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

    const sourceIndex = this.currentBoxIndex;

    let isDestinationIndexValid = this.checkIfDestinationIndexIsValid(destinationIndex);

    if (isDestinationIndexValid) {

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

    let isGameOver = true;

    const opponentPlayer = this.currentPlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;

    for (let i = 0; i < this.boardConfiguration.length; i++) {

      const piece = this.boardConfiguration[i];

      if (piece.color == opponentPlayer) {

        let validMoves = this.movesUtil.getValidMoves(i, opponentPlayer, this.blackKingIndex, this.whiteKingIndex, this.boardConfiguration);

        if (validMoves.length > 0) {
          isGameOver = false;
          break;
        }
      }
    }

    if (isGameOver) {
      this.resetGame();
    }
  }


  resetGame() {
    this.winner = this.currentPlayer;
    this.validMoves = [];
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
