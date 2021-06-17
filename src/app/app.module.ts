import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardUtil } from './utility/board.util';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MovesUtil } from './utility/moves.util';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    GameOverDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [BoardUtil, MovesUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
