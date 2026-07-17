import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './login/login.guard'; // Importeer de guard uit de login-map

const routes: Routes = [
  // 1. Bij het opstarten direct naar de aparte loginpagina sturen
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // 2. De inlogpagina staat volledig op zichzelf (Niet beveiligen!)
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule).catch(() => 
      import('./login/login.page').then(m => m.LoginPage)
    )
  },
  // 3. De Home pagina (Beveiligd)
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule).catch(() => 
      import('./home/home.page').then(m => m.HomePage)
    ),
    canMatch: [loginGuard]
  },
  // 4. Page 1 (Beveiligd)
  {
    path: 'page1',
    loadChildren: () => import('./page1/page1.module').then(m => m.Page1PageModule).catch(() => 
      import('./page1/page1.page').then(m => m.Page1Page)
    ),
    canMatch: [loginGuard]
  },
  // 5. Page 2 (Beveiligd)
  {
    path: 'page2',
    loadChildren: () => import('./page2/page2.module').then(m => m.Page2PageModule).catch(() => 
      import('./page2/page2.page').then(m => m.Page2Page)
    ),
    canMatch: [loginGuard]
  },
  // 6. Page 3 (Beveiligd)
  {
    path: 'page3',
    loadChildren: () => import('./page3/page3.module').then(m => m.Page3PageModule).catch(() => 
      import('./page3/page3.page').then(m => m.Page3Page)
    ),
    canMatch: [loginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }