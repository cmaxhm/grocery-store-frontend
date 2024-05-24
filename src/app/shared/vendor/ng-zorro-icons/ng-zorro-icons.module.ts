import { NgModule } from '@angular/core';
import {
  KeyOutline,
  LogoutOutline,
  OrderedListOutline,
  ShoppingCartOutline,
  UserOutline
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
  UserOutline,
  OrderedListOutline,
  ShoppingCartOutline,
  LogoutOutline,
  KeyOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class NgZorroIconsModule {}
