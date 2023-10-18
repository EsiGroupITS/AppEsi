import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsentGamePageRoutingModule } from './consent-game-routing.module';

import { ConsentGamePage } from './consent-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsentGamePageRoutingModule
  ],
  declarations: [ConsentGamePage]
})
export class ConsentGamePageModule {}
