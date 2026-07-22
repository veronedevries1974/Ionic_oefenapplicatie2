import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './login/login.guard'; 

const routes: Routes = [
  { // 1. BIJ OPSTARTEN: Stuur de gebruiker direct door naar /welcome
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  { // 2. DE WELKOMSTPAGINA: Nu op zijn eigen stabiele route
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  { // Route naar login-pagina
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  { // Route naar signup-pagina 
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  { // Homepage met navbalk en router-outlet beveiligd door guard 
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