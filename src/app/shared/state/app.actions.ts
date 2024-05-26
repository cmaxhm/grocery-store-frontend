import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add product': props<Product>(),
    'Decrease product quantity': props<Product>(),
    'Delete product': props<Product>(),
    'Empty cart': props<Partial<Product>>()
  }
});

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Set user': props<Partial<User>>(),
    'Delete user': props<Partial<User>>()
  }
});
