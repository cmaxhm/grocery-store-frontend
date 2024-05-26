import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { administratorGuard } from './guards/administrator.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    title: 'Tienda GSF - Administrador',
    canActivate: [administratorGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {}
