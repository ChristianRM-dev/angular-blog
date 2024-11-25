import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../core/layouts/admin-layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./components/post-list/post-list.component').then(
            (m) => m.PostListComponent
          ),
      },
      {
        path: 'post/create',
        loadComponent: () =>
          import('./components/post-form/post-form.component').then(
            (m) => m.PostFormComponent
          ),
      },
      {
        path: 'post/edit/:id',
        loadComponent: () =>
          import('./components/post-form/post-form.component').then(
            (m) => m.PostFormComponent
          ),
      },
    ],
  },
];
