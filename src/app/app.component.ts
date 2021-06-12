import { ArrayDataSource } from '@angular/cdk/collections';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Constants } from './model/constants';
import { Piece } from './model/piece';
import { Bishop } from './Pieces/piece.bishop';
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

  currentPlayer = Constants.PLAYER_ONE;

  recentMoveIndex = [-1, -1];

  currentBoxIndex = -1;

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
    this.resetPreviousMoveChanges();

    const currentPiece = this.boardConfiguration[index];
    const pieceColor = currentPiece.color;
    this.currentBoxIndex = index;

    if (pieceColor === this.currentPlayer) {

      this.addCurrentBoxBackgroundColor();
      this.validMoves = this.movesUtil.getValidMoves(index, this.currentPlayer, this.blackKingIndex, this.whiteKingIndex, this.boardConfiguration);
      this.addValidMovesBackgroundColor();

    } else {

      event.preventDefault();

    }
  }

  dragEnd(event: any) {
    event.preventDefault();
    this.resetPreviousMoveChanges();
  }

  drop(event: any, destinationIndex: number) {

    event.preventDefault();

    const sourceIndex = this.currentBoxIndex;

    let isDestinationIndexValid = this.checkIfDestinationIndexIsValid(destinationIndex);

    if (isDestinationIndexValid) {

      const sourcePiece = this.boardConfiguration[sourceIndex];

      const destinationPiece = this.boardConfiguration[destinationIndex];

      this.boardConfiguration[destinationIndex] = sourcePiece;

      this.boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '', index: -1 };

      this.setDeadPieceContainerArray(destinationPiece);

      this.removeCheckBackgroundColor();

      this.highlightRecentMove(sourceIndex, destinationIndex);

      this.updateKingsIndex(sourcePiece, destinationIndex);

      this.checkIfGameOver();

      this.switchPlayer();
    }
  }

  removeCheckBackgroundColor() {
    this.removeClassList('box' + this.blackKingIndex, 'king-check');
    this.removeClassList('box' + this.whiteKingIndex, 'king-check');
  }

  highlightRecentMove(sourceIndex: any, destinationIndex: number) {

    this.removeClassList('box' + this.recentMoveIndex[0], 'recent-move-source');
    this.removeClassList('box' + this.recentMoveIndex[1], 'recent-move-destination');

    this.recentMoveIndex = [sourceIndex, destinationIndex];

    this.addClassList('box' + this.recentMoveIndex[0], 'recent-move-source');
    this.addClassList('box' + this.recentMoveIndex[1], 'recent-move-destination');
  }

  addClassList(id: string, className: string) {
    document.getElementById(id)?.classList.add(className);
  }

  removeClassList(id: string, className: string) {
    document.getElementById(id)?.classList.remove(className);
  }

  allowDrop(event: any) {
    event.preventDefault();
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
    const id = this.currentPlayer === Constants.PLAYER_TWO ? 'white-winner-text' : 'black-winner-text'

    document.getElementById(id)?.classList.add('winner-text-show');

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

  resetPreviousMoveChanges() {
    this.removeValidMovesBackgroundColor();
    this.resetCurrentBoxBackgroundColor();
  }

  addValidMovesBackgroundColor() {
    this.validMoves.forEach(index => {
      const id = 'dot' + index;
      document.getElementById(id)?.classList.add('validMove');
    })
  }

  removeValidMovesBackgroundColor() {
    this.validMoves.forEach(index => {
      const id = 'dot' + index;
      document.getElementById(id)?.classList.remove('validMove');
    })

    this.validMoves = [];
  }

  resetCurrentBoxBackgroundColor() {
    this.removeClassList('box' + this.currentBoxIndex, 'drag-start');
  }

  addCurrentBoxBackgroundColor() {
    this.addClassList('box' + this.currentBoxIndex, 'drag-start');
  }

  getBackgroundColor(index: number) {
    return BoardUtil.getBackgroundColor(index);
  }
}
