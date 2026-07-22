import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './login/login.guard'; 

const routes: Routes = [
  { // Welkomstpagina
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule),
    pathMatch: 'full'
  },
  { // Route naar login-pagina
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  { // Route naar signup-pagina 
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  { // Homepage met navbalk en router-outlet waarbinnen page 1, 2, 3 beveiligd door guard 
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomePageModule),
    canActivate: [loginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }