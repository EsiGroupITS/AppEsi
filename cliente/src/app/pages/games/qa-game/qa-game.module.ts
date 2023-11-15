import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QaGamePageRoutingModule } from './qa-game-routing.module';

import { QaGamePage } from './qa-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QaGamePageRoutingModule
  ],
  declarations: [QaGamePage]
})
export class QaGamePageModule {}
