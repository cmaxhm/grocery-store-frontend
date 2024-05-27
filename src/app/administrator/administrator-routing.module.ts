import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { administratorGuard } from './guards/administrator.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    canActivate: [administratorGuard],
    children: [
      {
        path: 'catalog',
        loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'catalog'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {}
