import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectQuantityOfProductsInCart } from '../shared/state/app.selectors';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  /**
   * The list of products in the cart, used to display the number of products in the cart.
   */
  public productsInCart$: Observable<number>;

  constructor(private store: Store) {
    this.productsInCart$ = this.store.select(selectQuantityOfProductsInCart);
  }
}
