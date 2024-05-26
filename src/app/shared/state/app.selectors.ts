import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';

export const selectUser = createSelector(createFeatureSelector<Partial<User>>('user'), (user) => user);

export const selectCart = createSelector(createFeatureSelector<Product[]>('cart'), (products) => products);
export const selectQuantityOfProductInCart = (id?: string) => createSelector(createFeatureSelector<Product[]>('cart'), (products) => {
  const product = products.find((product) => product.id === id);

  return product ? product.quantity : 0;
});
export const selectQuantityOfProductsInCart = createSelector(createFeatureSelector<Product[]>('cart'), (products) => products.reduce((acc, product) => acc + product.quantity, 0));
