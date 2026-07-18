import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importeer de Component klasse (.page), NIET de module (.module)
import { HomePage } from './homepage.page'; 

const routes: Routes = [
  {
    path: '',
    component: HomePage, // Dit moet verwijzen naar de HomePage component klasse
    children: [
      {
        path: 'homepage',
        loadChildren: () => import('../homepage/homepage.module').then(m => m.HomePageModule)
      },
      {
        path: 'page1',
        loadChildren: () => import('../page1/page1.module').then(m => m.Page1PageModule)
      },
      {
        path: 'page2',
        loadChildren: () => import('../page2/page2.module').then(m => m.Page2PageModule)
      },
      {
        path: 'page3',
        loadChildren: () => import('../page3/page3.module').then(m => m.Page3PageModule)
      },
      {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}