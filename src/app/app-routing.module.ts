import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { provideSvgIcons } from '@ngneat/svg-icon';
import { dashboardIcon } from './svg/dashboard';

const routes: Routes = [
  { path: 'todos', loadChildren: () => import('./todos/todos.module').then((m) => m.TodosModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
  {
    path: 'foo',
    providers: [provideSvgIcons(dashboardIcon)],
    loadComponent() {
      return import('./foo-page/foo-page.component').then((m) => m.FooPageComponent);
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
