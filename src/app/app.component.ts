import { ArrayDataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Piece } from './model/Piece';
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
export class AppComponent implements OnInit {

  player = "Black Turn"

  PIECE_BLACK_INDEX = 0;

  PIECE_WHITE_INDEX = 1;

  ROOK_START_INDEX = [0, 0];

  KNIGHT_START_INDEX = [2, 2];

  BISHOP_START_INDEX = [4, 4];

  KING_START_INDEX = [6, 6];

  QUEEN_START_INDEX = [7, 7];

  PAWN_START_INDEX = [8, 8];

  PIECE_COLOR_BLACK = 'B';

  PIECE_COLOR_WHITE = 'W';

  title = 'ChessAIEngine';

  boxSize = 0;

  numOfBoxes: number[] = [];

  initialBoardConfigurationMap: Map<number, string[]> = new Map();

  boardConfiguration: Piece[] = [];

  blackDeadPiecesContainer = new Array<Piece>(16);

  whiteDeadPiecesContainer = new Array<Piece>(16);

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

    const emptyPiece = { color: '', type: '', unicode: '' };

    this.blackDeadPiecesContainer.fill(emptyPiece);

    this.whiteDeadPiecesContainer.fill(emptyPiece);

    this.numOfBoxes = Array.from(Array(64).keys())

    this.initialBoardConfigurationMap = BoardUtil.getInitialBoardConfigurationMap();

    for (let i = 0; i < 16; i++) {
      const unicode = this.initialBoardConfigurationMap.get(i)?.[0] || '';
      const type = this.initialBoardConfigurationMap.get(i)?.[1] || '';
      const color = this.initialBoardConfigurationMap.get(i)?.[2] || ''

      const piece: Piece = { unicode, type, color };

      this.boardConfiguration.push(piece);
      this.playerOneMoves.add(this.initialBoardConfigurationMap.get(i)?.[0] || '');
    }

    for (let i = 16; i < 48; i++) {
      const unicode = '';
      const type = '';
      const color = ''

      const piece: Piece = { unicode, type, color };

      this.boardConfiguration.push(piece);
    }

    for (let i = 48; i < 64; i++) {
      const unicode = this.initialBoardConfigurationMap.get(i)?.[0] || '';
      const type = this.initialBoardConfigurationMap.get(i)?.[1] || '';
      const color = this.initialBoardConfigurationMap.get(i)?.[2] || ''

      const piece: Piece = { unicode, type, color };

      this.boardConfiguration.push(piece);
      this.playerTwoMoves.add(this.initialBoardConfigurationMap.get(i)?.[0] || '');
    }
  }

  getBackgroundColor(index: number) {

    let color = '#42f597';

    const row = BoardUtil.getRowNumber(index);
    const column = BoardUtil.getColumnNumber(index);

    if ((row + column) % 2 === 0) {
      color = '#9e72b5';
    }

    return color;
  }

  dragStart(event: any, index: number) {

    if (this.validMoves.length !== 0) {
      this.validMoves = [];
      this.removeValidMovesBackgroundColor();
    }

    const currentPiece = this.boardConfiguration[index];

    const pieceColor = currentPiece.color;

    if (pieceColor === this.currentPlayer) {

      this.validMoves = this.getValidMoves(index);

      this.addValidMovesBackgroundColor();
      event.dataTransfer.setData("source", index);
    }
  }

  getValidMoves(index: number): number[] {

    let moves: number[] = [];

    let pieceInfo = this.boardConfiguration[index];

    let pieceUnicode = pieceInfo.unicode;

    let pieceColor = pieceInfo.color;

    if (pieceUnicode === Pawn.blackPawnUnicode) {
      moves = Pawn.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceUnicode === Pawn.whitePawnUnicode) {
      moves = Pawn.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceUnicode === Rook.blackRookUnicode) {
      moves = Rook.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceUnicode === Rook.whiteRookUnicode) {
      moves = Rook.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceUnicode === Knight.blackKnightUnicode) {
      moves = Knight.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceUnicode === Knight.whiteKnightUnicode) {
      moves = Knight.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceUnicode === Bishop.whiteBishopUnicode) {
      moves = Bishop.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceUnicode === Bishop.blackBishopUnicode) {
      moves = Bishop.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceUnicode === Queen.blackQueenUnicode) {
      moves = Queen.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);

    } else if (pieceUnicode === Queen.whiteQueenUnicode) {
      moves = Queen.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceUnicode === King.whiteKingUnicode) {
      moves = King.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_WHITE);

    } else if (pieceUnicode === King.blackKingUnicode) {
      moves = King.getMoves(index, this.boardConfiguration, this.PIECE_COLOR_BLACK);
    }

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

      const sourcePiece = this.boardConfiguration[sourceIndex];

      const destinationPiece = this.boardConfiguration[destinationIndex];

      if (destinationPiece.unicode !== '') {
        this.setDeadPieceContainerArray(destinationPiece);
      }

      this.boardConfiguration[destinationIndex] = sourcePiece;

      this.boardConfiguration[sourceIndex] = { unicode: '', color: '', type: '' };

      this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;

      this.player = this.currentPlayer === this.playerOne ? "Black Turn" : "White Turn";
    }
  }

  setDeadPieceContainerArray(piece: Piece) {

    const color = piece.color;
    const type = piece.type;

    let arr = this.blackDeadPiecesContainer;

    if (color === this.PIECE_COLOR_WHITE) {
      arr = this.whiteDeadPiecesContainer;
    }

    let index = this.getIndex(type, color);

    arr[index] = piece;
  }

  getIndex(type: string, color: string) {

    let index = -1;

    let pos = 0;

    switch (type) {

      case "R":
        pos = color === this.PIECE_COLOR_BLACK ? 0 : 1;
        index = this.ROOK_START_INDEX[pos];
        this.ROOK_START_INDEX[pos] += 1;
        break;

      case "K":
        pos = color === this.PIECE_COLOR_BLACK ? 0 : 1;
        index = this.KNIGHT_START_INDEX[pos];
        this.KNIGHT_START_INDEX[pos] += 1;
        break;

      case "B":
        pos = color === this.PIECE_COLOR_BLACK ? 0 : 1;
        index = this.BISHOP_START_INDEX[pos];
        this.BISHOP_START_INDEX[pos] += 1;
        break;

      case "KG":
        pos = color === this.PIECE_COLOR_BLACK ? 0 : 1;
        index = this.KING_START_INDEX[pos];
        break;

      case "Q":
        pos = color === this.PIECE_COLOR_BLACK ? 0 : 1;
        index = this.QUEEN_START_INDEX[pos];
        break;

      case "P":
        pos = color === this.PIECE_COLOR_BLACK ? 0 : 1;
        index = this.PAWN_START_INDEX[pos];
        this.PAWN_START_INDEX[pos] += 1;
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

  allowDrop(event: any) {
    event.preventDefault();
  }
}
