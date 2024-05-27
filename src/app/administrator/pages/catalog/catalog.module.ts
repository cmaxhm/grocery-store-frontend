import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { EditProductModalComponent } from './modals/edit-product-modal/edit-product-modal.component';

@NgModule({
  declarations: [
    CatalogComponent,
    EditProductModalComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule
  ]
})
export class CatalogModule {}
