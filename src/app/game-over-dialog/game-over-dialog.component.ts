import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
  styleUrls: ['./game-over-dialog.component.scss']
})
export class GameOverDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<GameOverDialogComponent>) { }

  ngOnInit(): void {

  }

  onClose(val: number): void {
    this.dialogRef.close(val);
  }
}
