import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsentGamePage } from './consent-game.page';

const routes: Routes = [
  {
    path: '',
    component: ConsentGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsentGamePageRoutingModule {}
