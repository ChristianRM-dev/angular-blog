import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '../../core/layouts/public-layout/public-layout.component';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./components/read-post/read-post.component').then(
            (m) => m.ReadPostComponent
          ),
      },
    ],
  },
];
