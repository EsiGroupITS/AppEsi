import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoulettePage } from './roulette.page';

const routes: Routes = [
  {
    path: '',
    component: RoulettePage,
  },
  {
    path: 'questions/:mensaje',
    loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoulettePageRoutingModule {}
