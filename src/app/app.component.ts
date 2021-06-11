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



  constructor() { }

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
    this.resetPreviousValidMoves();

    const currentPiece = this.boardConfiguration[index];
    const pieceColor = currentPiece.color;

    if (pieceColor === this.currentPlayer) {

      document.getElementById('box' + index)?.classList.add('drag-start');

      this.validMoves = this.getValidMoves(index);
      this.addValidMovesBackgroundColor();

      this.currentBoxIndex = index;
    } else {

      event.preventDefault();

    }
  }

  dragEnd(event: any) {
    event.preventDefault();

    this.removeValidMovesBackgroundColor();

    document.getElementById('box' + this.currentBoxIndex)?.classList.remove('drag-start');
  }

  drop(event: any, destinationIndex: number) {

    event.preventDefault();

    const sourceIndex = this.currentBoxIndex;

    let isDestinationIndexValid = this.checkIfDestinationIndexIsValid(destinationIndex);

    if (isDestinationIndexValid) {

      this.removeClassList('box' + this.blackKingIndex, 'king-check');

      this.removeClassList('box' + this.whiteKingIndex, 'king-check');

      const sourcePiece = this.boardConfiguration[sourceIndex];

      const destinationPiece = this.boardConfiguration[destinationIndex];

      if (destinationPiece.unicode !== '') {
        this.setDeadPieceContainerArray(destinationPiece);
      }

      this.boardConfiguration[destinationIndex] = sourcePiece;

      this.boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '', index: -1 };

      this.highlightRecentMove(sourceIndex, destinationIndex);

      this.switchPlayer();

      this.updateKingsIndex(sourcePiece, destinationIndex);

      this.checkIfGameOver();
    }
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

  resetPreviousValidMoves() {
    if (this.validMoves.length !== 0) {
      this.validMoves = [];
      this.removeValidMovesBackgroundColor();
    }
  }

  getValidMoves(index: number): number[] {

    let pieceInfo = this.boardConfiguration[index];

    let validMoves = MovesUtil.getValidMoves(index, this.boardConfiguration);

    // if (pieceInfo.color === this.currentPlayer) {

    //   this.removeValidMovesBackgroundColor();

    //   this.validMoves = validMoves;

    //   this.addValidMovesBackgroundColor();

    // }

    validMoves = this.validateAllGeneratedMoves(validMoves, index);

    return validMoves;
  }

  checkIfGameOver() {

    let isGameOver = true;

    for (let i = 0; i < this.boardConfiguration.length; i++) {

      const piece = this.boardConfiguration[i];

      if (piece.color === this.currentPlayer) {

        let validMoves = MovesUtil.getValidMoves(i, this.boardConfiguration);

        validMoves = this.validateAllGeneratedMoves(validMoves, i);

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
    const id = this.currentPlayer === Constants.PLAYER_ONE ? 'white-winner-text' : 'black-winner-text'

    document.getElementById(id)?.classList.add('winner-text-show');

    this.validMoves = [];

    //this.boardConfiguration = BoardUtil.getInitialBoardConfiguration();
  }


  validateAllGeneratedMoves(validMoves: number[], sourceIndex: number): number[] {

    let allMoves = new Set<number>();

    validMoves.forEach(moveIndex => {

      let destinationPiece = this.boardConfiguration[moveIndex];
      let sourcePiece = this.boardConfiguration[sourceIndex];

      this.mockMove(sourceIndex, moveIndex, this.boardConfiguration);

      let oppositePlayerAllMoves = this.getOppositePlayerAllPieceMoves();

      oppositePlayerAllMoves.forEach(move => {
        allMoves.add(move);
      })

      this.boardConfiguration[sourceIndex] = sourcePiece;
      this.boardConfiguration[moveIndex] = destinationPiece;

      let index = this.blackKingIndex;

      if (this.currentPlayer === Constants.PIECE_COLOR_WHITE) index = this.whiteKingIndex;

      const tempIndex = index;

      if (sourcePiece.type === Constants.KING) {
        index = moveIndex;
      }

      if (allMoves.has(index)) {
        this.addClassList('box' + tempIndex, 'king-check');
        validMoves = validMoves.filter(item => item !== moveIndex);
      }

      allMoves.clear();

    });

    return validMoves;

  }

  getOppositePlayerAllPieceMoves() {
    let oppositePlayer = this.currentPlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;

    let allMoves: number[] = [];
    for (let i = 0; i < this.boardConfiguration.length; i++) {

      const piece = this.boardConfiguration[i];

      if (piece.color === oppositePlayer) {

        let moves = MovesUtil.getValidMoves(i, this.boardConfiguration);

        allMoves = allMoves.concat(moves);

      }
    }

    return allMoves;
  }


  mockMove(sourceIndex: number, moveIndex: number, boardConfiguration: Piece[]) {

    boardConfiguration[moveIndex] = boardConfiguration[sourceIndex];

    boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '', index: -1 };

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

    const color = piece.color;
    const type = piece.type;

    let arr = this.blackDeadPiecesContainer;

    if (color === Constants.PIECE_COLOR_WHITE) {
      arr = this.whiteDeadPiecesContainer;
    }

    let index = this.getPieceIndex(type, color);

    arr[index] = piece;
  }

  getPieceIndex(type: string, color: string) {

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
  }

  getBackgroundColor(index: number) {
    return BoardUtil.getBackgroundColor(index);
  }
}
