import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QaGamePage } from './qa-game.page';

const routes: Routes = [
  {
    path: '',
    component: QaGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QaGamePageRoutingModule {}
