import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlackBishop } from './Pieces/black.bishop';
import { BlackKing } from './Pieces/black.king';
import { BlackKnight } from './Pieces/black.knight';
import { BlackPawn } from './Pieces/black.pawn';
import { BlackQueen } from './Pieces/black.queen';
import { BlackRook } from './Pieces/black.rook';
import { Piece } from './Pieces/piece';
import { WhiteBishop } from './Pieces/white.bishop';
import { WhiteKing } from './Pieces/white.king';
import { WhiteKnight } from './Pieces/white.knight';
import { WhitePawn } from './Pieces/white.pawn';
import { WhiteQueen } from './Pieces/white.queen';
import { WhiteRook } from './Pieces/white.rook';

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

  unicode = '';

  boardIndexToUnicodeMap = new Map<number, string>();

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {
    this.numOfBoxes = Array.from(Array(64).keys())

    this.boardIndexToUnicodeMap.set(0, new BlackRook().unicode);
    this.boardIndexToUnicodeMap.set(1, new BlackKnight().unicode);
    this.boardIndexToUnicodeMap.set(2, new BlackBishop().unicode);
    this.boardIndexToUnicodeMap.set(3, new BlackQueen().unicode);
    this.boardIndexToUnicodeMap.set(4, new BlackKing().unicode);
    this.boardIndexToUnicodeMap.set(5, new BlackRook().unicode);
    this.boardIndexToUnicodeMap.set(6, new BlackKnight().unicode);
    this.boardIndexToUnicodeMap.set(7, new BlackBishop().unicode);

    this.boardIndexToUnicodeMap.set(8, new BlackPawn().unicode);
    this.boardIndexToUnicodeMap.set(9, new BlackPawn().unicode);
    this.boardIndexToUnicodeMap.set(10, new BlackPawn().unicode);
    this.boardIndexToUnicodeMap.set(11, new BlackPawn().unicode);
    this.boardIndexToUnicodeMap.set(12, new BlackPawn().unicode);
    this.boardIndexToUnicodeMap.set(13, new BlackPawn().unicode);
    this.boardIndexToUnicodeMap.set(14, new BlackPawn().unicode);
    this.boardIndexToUnicodeMap.set(15, new BlackPawn().unicode);

    this.boardIndexToUnicodeMap.set(48, new WhitePawn().unicode);
    this.boardIndexToUnicodeMap.set(49, new WhitePawn().unicode);
    this.boardIndexToUnicodeMap.set(50, new WhitePawn().unicode);
    this.boardIndexToUnicodeMap.set(51, new WhitePawn().unicode);
    this.boardIndexToUnicodeMap.set(52, new WhitePawn().unicode);
    this.boardIndexToUnicodeMap.set(53, new WhitePawn().unicode);
    this.boardIndexToUnicodeMap.set(54, new WhitePawn().unicode);
    this.boardIndexToUnicodeMap.set(55, new WhitePawn().unicode);

    this.boardIndexToUnicodeMap.set(56, new WhiteRook().unicode);
    this.boardIndexToUnicodeMap.set(57, new WhiteKnight().unicode);
    this.boardIndexToUnicodeMap.set(58, new WhiteBishop().unicode);
    this.boardIndexToUnicodeMap.set(59, new WhiteQueen().unicode);
    this.boardIndexToUnicodeMap.set(60, new WhiteKing().unicode);
    this.boardIndexToUnicodeMap.set(61, new WhiteRook().unicode);
    this.boardIndexToUnicodeMap.set(62, new WhiteKnight().unicode);
    this.boardIndexToUnicodeMap.set(63, new WhiteBishop().unicode);
  }

  ngAfterViewInit(): void {
    this.boxSize = 100;
  }

  getBackgroundColor(index: number) {

    let color = 'white';

    const row = Math.floor(index / 8);
    const column = index % 8;

    if ((row + column) % 2 === 0) {
      color = 'gray';
    }

    return color;
  }

  getUnicodeValue(index: number) {
    return this.boardIndexToUnicodeMap.get(index);
  }

}
