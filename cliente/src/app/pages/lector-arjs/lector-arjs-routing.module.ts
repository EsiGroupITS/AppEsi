import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LectorArjsPage } from './lector-arjs.page';

const routes: Routes = [
  {
    path: '',
    component: LectorArjsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectorArjsPageRoutingModule {}
