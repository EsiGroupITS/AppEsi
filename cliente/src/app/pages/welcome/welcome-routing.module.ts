import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage } from './welcome.page';
import { provideState } from '@ngrx/store';
import { uiFeatureKey, uiReducer } from 'src/app/ui-state/reducers/ui.reducers';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
