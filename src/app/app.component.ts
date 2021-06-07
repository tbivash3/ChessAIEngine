import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlackPawn } from './Pieces/black.pawn';
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

  boardConfiguration: string[] = [];

  validMoves: Set<number> = new Set();

  constructor() { }

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {
    this.numOfBoxes = Array.from(Array(64).keys())

    this.initialBoardConfigurationMap = BoardUtil.getInitialBoardConfigurationMap();

    for (let i = 0; i < 64; i++) {
      this.boardConfiguration.push(this.initialBoardConfigurationMap.get(i) || '');
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
    this.validMoves = BlackPawn.getMoves(index, this.initialBoardConfigurationMap);

    event.dataTransfer.setData("source", index);
  }

  dragging(event: any) {

  }

  drop(event: any, destinationIndex: number) {

    event.preventDefault();

    const sourceIndex = event.dataTransfer.getData("source");

    const currentSourceIndexValue = this.boardConfiguration[sourceIndex];

    const currentDestinationIndexValue = this.boardConfiguration[destinationIndex];

    this.boardConfiguration[destinationIndex] = currentSourceIndexValue;

    this.boardConfiguration[sourceIndex] = currentDestinationIndexValue;
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  getUnicodeValue(index: number) {
    return this.initialBoardConfigurationMap.get(index);
  }

}
