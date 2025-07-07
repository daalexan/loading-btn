import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-container/main-container.component').then(c => c.MainContainerComponent)
  }
];
