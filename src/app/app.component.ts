import { ArrayDataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Bishop } from './Pieces/bishop';
import { King } from './Pieces/King';
import { Knight } from './Pieces/knight';
import { Pawn } from './Pieces/pawn';
import { Queen } from './Pieces/Queen';
import { Rook } from './Pieces/Rook';
import { BoardUtil } from './utility/board.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  PIECE_BLACK_INDEX = 0;

  PIECE_WHITE_INDEX = 1;

  ROOK_START_INDEX = 0;

  KNIGHT_START_INDEX = 2;

  BISHOP_START_INDEX = 4;

  KING_START_INDEX = 6;

  QUEEN_START_INDEX = 7;

  PAWN_START_INDEX = 8;

  PIECE_COLOR_BLACK = 'B';

  PIECE_COLOR_WHITE = 'W';

  title = 'ChessAIEngine';

  boxSize = 0;

  numOfBoxes: number[] = [];

  initialBoardConfigurationMap: Map<number, string[]> = new Map();

  boardConfiguration: string[][] = [];

  blackDeadPiecesContainer = new Array<String>(16);

  whiteDeadPiecesContainer = new Array<String>(16);

  deadContainerIndex: number[][] = [];

  validMoves: number[] = [];

  playerOneMoves: Set<String> = new Set();

  playerTwoMoves: Set<String> = new Set();

  playerOne = 'B';

  playerTwo = 'W';

  currentPlayer = 'B';

  pieceSelectedIndex = -1;

  constructor() { }

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {

    this.blackDeadPiecesContainer.fill('');

    this.whiteDeadPiecesContainer.fill('');

    this.numOfBoxes = Array.from(Array(64).keys())

    this.initialBoardConfigurationMap = BoardUtil.getInitialBoardConfigurationMap();

    for (let i = 0; i < 16; i++) {
      this.boardConfiguration.push([this.initialBoardConfigurationMap.get(i)?.[0] || '', "B", this.initialBoardConfigurationMap.get(i)?.[1] || '']);
      this.playerOneMoves.add(this.initialBoardConfigurationMap.get(i)?.[0] || '');
    }

    for (let i = 16; i < 48; i++) {
      this.boardConfiguration.push([this.initialBoardConfigurationMap.get(i)?.[0] || '', "", this.initialBoardConfigurationMap.get(i)?.[1] || '']);
    }

    for (let i = 48; i < 64; i++) {
      this.boardConfiguration.push([this.initialBoardConfigurationMap.get(i)?.[0] || '', "W", this.initialBoardConfigurationMap.get(i)?.[1] || '']);
      this.playerTwoMoves.add(this.initialBoardConfigurationMap.get(i)?.[0] || '');
    }
  }

  ngAfterViewInit(): void {
    this.boxSize = 100;
  }

  getBackgroundColor(index: number) {

    let color = 'white';

    const row = BoardUtil.getRowNumber(index);
    const column = BoardUtil.getColumnNumber(index);

    if ((row + column) % 2 === 0) {
      color = 'gray';
    }

    return color;
  }

  dragStart(event: any, index: number) {

    this.removeValidMovesBackgroundColor();

    this.validMoves = [];

    const currentPiece = this.boardConfiguration[index];

    const pieceColor = currentPiece[1];

    if (pieceColor === this.currentPlayer) {


      this.validMoves = this.getValidMoves(index);

      this.addValidMovesBackgroundColor();
      event.dataTransfer.setData("source", index);
    }
  }

  getValidMoves(index: number): number[] {

    let moves: number[] = [];

    let pieceInfo = this.boardConfiguration[index];

    if (pieceInfo[0] === Pawn.blackPawnUnicode) {
      moves = Pawn.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceInfo[0] === Pawn.whitePawnUnicode) {
      moves = Pawn.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceInfo[0] === Rook.blackRookUnicode) {
      moves = Rook.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceInfo[0] === Rook.whiteRookUnicode) {
      moves = Rook.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceInfo[0] === Knight.blackKnightUnicode) {
      moves = Knight.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceInfo[0] === Knight.whiteKnightUnicode) {
      moves = Knight.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceInfo[0] === Bishop.whiteBishopUnicode) {
      moves = Bishop.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceInfo[0] === Bishop.blackBishopUnicode) {
      moves = Bishop.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceInfo[0] === Queen.blackQueenUnicode) {
      moves = Queen.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceInfo[0] === Queen.whiteQueenUnicode) {
      moves = Queen.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceInfo[0] === King.whiteKingUnicode) {
      moves = King.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceInfo[0] === King.blackKingUnicode) {
      moves = King.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);
    }

    const currentPiece = this.boardConfiguration[index];

    const pieceColor = currentPiece[1];

    if (pieceColor === this.currentPlayer) {

      this.removeValidMovesBackgroundColor();

      this.validMoves = moves;

      this.addValidMovesBackgroundColor();

    }

    return moves;
  }

  dragging(event: any) {

  }

  drop(event: any, destinationIndex: number) {

    this.removeValidMovesBackgroundColor();

    event.preventDefault();

    let isDestinationIndexValid = this.checkIfDestinationIndexIsValid(destinationIndex);

    if (isDestinationIndexValid) {

      const sourceIndex = event.dataTransfer.getData("source");

      const currentSourceIndexValue = this.boardConfiguration[sourceIndex];

      const destinationIndexValue = this.boardConfiguration[destinationIndex];

      if (destinationIndexValue[0] !== '') {
        this.setDeadPieceContainerArray(destinationIndexValue);
      }

      this.boardConfiguration[destinationIndex] = currentSourceIndexValue;

      this.boardConfiguration[sourceIndex] = ['', ''];

      this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    }
  }

  setDeadPieceContainerArray(piece: string[]) {

    const color = piece[1];
    const type = piece[2];
    const unicode = piece[0];

    let arr = this.blackDeadPiecesContainer;

    if (color === this.PIECE_COLOR_WHITE) {
      arr = this.whiteDeadPiecesContainer;
    }

    let index = this.getIndex(type);

    arr[index] = unicode;
  }
  getIndex(type: string) {

    let index = -1;

    switch (type) {

      case "R":
        index = this.ROOK_START_INDEX;
        this.ROOK_START_INDEX += 1;
        break;

      case "K":
        index = this.KNIGHT_START_INDEX;
        this.KNIGHT_START_INDEX += 1;
        break;

      case "B":
        index = this.BISHOP_START_INDEX;
        this.BISHOP_START_INDEX += 1;
        break;

      case "KG":
        index = this.KING_START_INDEX;
        break;

      case "Q":
        index = this.QUEEN_START_INDEX;
        break;

      case "P":
        index = this.PAWN_START_INDEX;
        this.PAWN_START_INDEX += 1;
        break;
    }
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

      const id = 'box' + index;
      document.getElementById(id)?.classList.add('validMove');

    })
  }

  removeValidMovesBackgroundColor() {
    this.validMoves.forEach(index => {
      const id = 'box' + index;
      document.getElementById(id)?.classList.remove('validMove');
    })
  }

  allowDrop(event: any) {
    event.preventDefault();
  }
}
