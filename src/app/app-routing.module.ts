import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./store/pages/products/products.module').then(m => m.ProductsModule),
        title: 'Tienda GSF'
      },
      {
        path: 'cart',
        loadChildren: () => import('./store/pages/cart/cart.module').then(m => m.CartModule),
        title: 'Tienda GSF - Carrito'
      },
      {
        path: 'login',
        loadChildren: () => import('./store/pages/login/login.module').then(m => m.LoginModule),
        title: 'Tienda GSF - Iniciar sesión'
      }
    ]
  },
  {
    path: 'administrator',
    loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
