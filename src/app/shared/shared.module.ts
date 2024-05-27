import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { TableComponent } from './components/table/table.component';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { NgZorroIconsModule } from './vendor/ng-zorro-icons/ng-zorro-icons.module';

@NgModule({
  declarations: [
    FilterProductsPipe,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    NgZorroIconsModule,
    NzBadgeModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzModalModule,
    NzPopconfirmModule,
    NzMenuModule,
    NzTableModule,
    NzToolTipModule,
    RouterModule
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    NgZorroIconsModule,
    NzBadgeModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzModalModule,
    NzMenuModule,
    NzPopconfirmModule,
    NzTableModule,
    NzToolTipModule,
    ReactiveFormsModule,
    RouterModule,

    // Components
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    TableComponent,

    // Pipes
    FilterProductsPipe
  ]
})
export class SharedModule {}
