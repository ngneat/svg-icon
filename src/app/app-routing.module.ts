import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'todos', loadChildren: () => import('./todos/todos.module').then((m) => m.TodosModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
