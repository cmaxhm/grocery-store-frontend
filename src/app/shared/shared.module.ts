import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderComponent } from './components/header/header.component';
import { NgZorroIconsModule } from './vendor/ng-zorro-icons/ng-zorro-icons.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NgZorroIconsModule,
    NzMenuModule,
    RouterModule
  ],
  exports: [
    // Modules
    CommonModule,
    NzLayoutModule,
    NgZorroIconsModule,
    NzMenuModule,
    ReactiveFormsModule,
    RouterModule,

    // Components
    HeaderComponent
  ]
})
export class SharedModule {}
