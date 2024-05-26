import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { cartActions } from '../../state/app.actions';
import { selectQuantityOfProductInCart } from '../../state/app.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  /**
   * The product object coming from parent component to display.
   */
  @Input() public product!: Product;

  /**
   * The quantity of the product in cart.
   */
  public quantityOfProductInCart$?: Observable<number>;

  constructor(private store: Store) {}

  /**
   * Initialize the required data.
   */
  public ngOnInit(): void {
    this.quantityOfProductInCart$ = this.store.select(selectQuantityOfProductInCart(this.product?.id));
  }

  /**
   * Add the product to the cart.
   */
  public addToCart(): void {
    this.store.dispatch(cartActions.addProduct(this.product));
  }
}
