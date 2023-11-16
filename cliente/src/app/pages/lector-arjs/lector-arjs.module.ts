import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorArjsPageRoutingModule } from './lector-arjs-routing.module';

import { LectorArjsPage } from './lector-arjs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorArjsPageRoutingModule
  ],
  declarations: [LectorArjsPage]
})
export class LectorArjsPageModule {}
