import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePuzzlePageRoutingModule } from './game-puzzle-routing.module';

import { GamePuzzlePage } from './game-puzzle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePuzzlePageRoutingModule
  ],
  declarations: [GamePuzzlePage]
})
export class GamePuzzlePageModule {}
