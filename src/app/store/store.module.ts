import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    StoreRoutingModule
  ],
  exports: []
})
export class StoreModule {}
