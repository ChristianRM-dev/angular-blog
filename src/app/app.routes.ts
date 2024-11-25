import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () =>
      import('./features/public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '', redirectTo: 'public', pathMatch: 'full' }, // Default to public
];
