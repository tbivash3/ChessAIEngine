import { CdkDrag, CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  initialBoardConfigurationMap!: Map<number, string>;

  constructor(private boardUtil: BoardUtil) { }

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {
    this.numOfBoxes = Array.from(Array(64).keys())

    this.initialBoardConfigurationMap = this.boardUtil.getInitialBoardConfigurationMap();
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

  dragStart(event: any) {
    console.log(event.target.id);
    event.dataTransfer.setData("Text", event.target.id);
  }

  dragging(event: any) {

  }

  drop(event: any) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  getUnicodeValue(index: number) {
    return this.initialBoardConfigurationMap.get(index);
  }

}
