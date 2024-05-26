import { createReducer, on } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { cartActions, userActions } from './app.actions';

export const initialUserState: Partial<User> = {};
export const initialCartState: Product[] = [];

export const userReducer = createReducer(
  initialUserState,
  on(userActions.setUser, (_state, newState): Partial<User> => newState),
  on(userActions.deleteUser, (): Partial<User> => ({}))
);

export const cartReducer = createReducer(
  initialCartState,
  on(cartActions.addProduct, (_state, newState): Product[] => {
    if (_state.find((product) => product.id === newState.id)) {
      return _state.map((product) => {
        if (product.id === newState.id) return { ...product, quantity: product.quantity + 1 };

        return product;
      });
    }

    return [
      ..._state,
      {
        id: newState.id,
        name: newState.name,
        price: newState.price,
        description: newState.description,
        quantity: 1
      }
    ];
  }),
  on(cartActions.decreaseProductQuantity, (_state, newState): Product[] => {
    if (_state.find((product) => product.id === newState.id)) {
      return _state.map((product) => {
        if (product.id === newState.id) return { ...product, quantity: product.quantity - 1 };

        return product;
      });
    }

    return [..._state, { ...newState, quantity: newState.quantity - 1 }];
  }),
  on(cartActions.deleteProduct, (_state, newState): Product[] => _state.filter((product) => product.id !== newState.id)),
  on(cartActions.emptyCart, (): Product[] => [])
);
