
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/auth/login/login.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),


  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    component: LoginPage,
    //loadChildren: () => import('./shared/modules/accesibility/accesibility.module').then( m => m.AccesibilityModule)
  },
  {
    path: 'admin/home',
    loadChildren: () => import('./admin/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./admin/register-user/register-user.module').then( m => m.RegisterUserPageModule)

  },
  {
    path: 'lector-arjs',
    loadChildren: () => import('./pages/lector-arjs/lector-arjs.module').then( m => m.LectorArjsPageModule)
  },
  {
    path: 'memory-game',
    loadChildren: () => import('./pages/games/memory_game/memory-game/memory-game.module').then( m => m.MemoryGamePageModule)
  },
  {
    path: 'game-puzzle',
    loadChildren: () => import('./pages/game-puzzle/game-puzzle.module').then( m => m.GamePuzzlePageModule)
  },
  {
    path: 'game-puzzle',
    loadChildren: () => import('./pages/game-puzzle/game-puzzle.module').then( m => m.GamePuzzlePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
