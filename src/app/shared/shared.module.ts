import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { NgZorroIconsModule } from './vendor/ng-zorro-icons/ng-zorro-icons.module';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductComponent,
    FilterProductsPipe,
    TableComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NzBadgeModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzTableModule,
    NgZorroIconsModule,
    NzMenuModule,
    RouterModule
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    NzBadgeModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzTableModule,
    NgZorroIconsModule,
    NzMenuModule,
    ReactiveFormsModule,
    RouterModule,

    // Components
    HeaderComponent,
    ProductComponent,
    TableComponent,
    FooterComponent,

    // Pipes
    FilterProductsPipe
  ]
})
export class SharedModule {}
