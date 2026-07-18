import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './login/login.guard'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomePageModule),
    canActivate: [loginGuard] // <--- Veranderd naar canActivate
  },
  {
    path: 'page1',
    loadChildren: () => import('./page1/page1.module').then(m => m.Page1PageModule),
    canActivate: [loginGuard] // <--- Veranderd naar canActivate
  },
  {
    path: 'page2',
    loadChildren: () => import('./page2/page2.module').then(m => m.Page2PageModule),
    canActivate: [loginGuard] // <--- Veranderd naar canActivate
  },
  {
    path: 'page3',
    loadChildren: () => import('./page3/page3.module').then(m => m.Page3PageModule),
    canActivate: [loginGuard] // <--- Veranderd naar canActivate
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }