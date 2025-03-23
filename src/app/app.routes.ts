import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'page1',
    loadComponent: () => import('./pages/page1/page1.component').then(m => m.Page1Component)
  },
  {
    path: 'page2',
    loadComponent: () => import('./pages/page2/page2.component').then(m => m.Page2Component)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'page1'
  }
];
