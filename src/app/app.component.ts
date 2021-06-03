import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('board')
  board!: ElementRef;

  ngOnInit(): void {
    this.numOfBoxes = Array.from(Array(64).keys())
  }

  ngAfterViewInit(): void {
    this.boxSize = 100;
  }

  getBackgroundColor(index: number) {

    let color = 'white';

    const row = Math.floor(index / 8);
    const column = index % 8;

    if ((row + column) % 2 === 0) {
      color = 'black';
    }

    return color;

  }

}
