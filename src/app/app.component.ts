import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlackKnight } from './Pieces/black.knight';
import { BlackPawn } from './Pieces/black.pawn';
import { BlackRook } from './Pieces/black.rook';
import { WhiteKnight } from './Pieces/white.knight';
import { WhitePawn } from './Pieces/white.pawn';
import { WhiteRook } from './Pieces/white.rook';
import { BoardUtil } from './utility/board.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  COLOR_WHITE = 'white';

  COLOR_BLACK = 'black';

  title = 'ChessAIEngine';

  boxSize = 0;

  numOfBoxes: number[] = [];

  initialBoardConfigurationMap: Map<number, string> = new Map();

  boardConfiguration: string[][] = [];

  validMoves: number[] = [];

  constructor() { }

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {
    this.numOfBoxes = Array.from(Array(64).keys())

    this.initialBoardConfigurationMap = BoardUtil.getInitialBoardConfigurationMap();

    for (let i = 0; i < 16; i++) {
      this.boardConfiguration.push([this.initialBoardConfigurationMap.get(i) || '', "B"]);
    }

    for (let i = 16; i < 48; i++) {
      this.boardConfiguration.push([this.initialBoardConfigurationMap.get(i) || '', ""]);
    }

    for (let i = 48; i < 64; i++) {
      this.boardConfiguration.push([this.initialBoardConfigurationMap.get(i) || '', "W"]);
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
    this.validMoves = this.getValidMoves(index);

    this.addValidMovesBackgroundColor();
    event.dataTransfer.setData("source", index);
  }

  getValidMoves(index: number): number[] {

    let moves: number[] = [];

    let pieceInfo = this.boardConfiguration[index];

    if (pieceInfo[0] === BlackPawn.unicode) {
      moves = BlackPawn.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhitePawn.unicode) {
      moves = WhitePawn.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === BlackRook.unicode) {
      moves = BlackRook.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhiteRook.unicode) {
      moves = WhiteRook.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === BlackKnight.unicode) {
      moves = BlackKnight.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhiteKnight.unicode) {
      moves = WhiteKnight.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhitePawn.unicode) {
      moves = WhitePawn.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhitePawn.unicode) {
      moves = WhitePawn.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhitePawn.unicode) {
      moves = WhitePawn.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhitePawn.unicode) {
      moves = WhitePawn.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhitePawn.unicode) {
      moves = WhitePawn.getMoves(index, this.boardConfiguration);

    } else if (pieceInfo[0] === WhitePawn.unicode) {
      moves = WhitePawn.getMoves(index, this.boardConfiguration);
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

      this.boardConfiguration[destinationIndex] = currentSourceIndexValue;

      this.boardConfiguration[sourceIndex] = ['', ''];
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
