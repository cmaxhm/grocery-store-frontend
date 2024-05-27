import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Order } from '../../../shared/interfaces/order.interface';
import { Product } from '../../../shared/interfaces/product.interface';
import { LoginService } from '../../../shared/services/login.service';
import { OrdersService } from '../../../shared/services/orders.service';
import { cartActions } from '../../../shared/state/app.actions';
import { selectCart } from '../../../shared/state/app.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {
  /**
   * The cart products list.
   */
  public cartProducts$: Observable<Product[]>;

  /**
   * The total price.
   */
  public totalPrice: number;

  /**
   * The products list.
   *
   * @private
   */
  private products: Product[];

  /**
   * The destroy subject. Used to avoid memory leaks.
   *
   * @private
   */
  private destroy$: Subject<void>;

  constructor(
    private store: Store,
    private ordersService: OrdersService,
    private loginService: LoginService,
    private nzMessageService: NzMessageService
  ) {
    this.totalPrice = 0;
    this.products = [];
    this.destroy$ = new Subject();
    this.cartProducts$ = this.store
      .select(selectCart)
      .pipe(tap((products) => {
        this.totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        this.products = products;
      }));
  }

  /**
   * Emits the destroy subject to avoid memory leaks.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Decreases the quantity from product in the cart.
   *
   * @param product The product to decrease the quantity from.
   */
  public decreaseProductQuantityFromCart(product: Product): void {
    this.store.dispatch(cartActions.decreaseProductQuantity(product));
  }

  /**
   * Add a product to the cart.
   *
   * @param product The product to delete from cart.
   */
  public deleteProductFromCart(product: Product): void {
    this.store.dispatch(cartActions.deleteProduct(product));
  }

  /**
   * Add a product to the cart.
   *
   * @param product The product to add.
   */
  public addProductToCart(product: Product): void {
    this.store.dispatch(cartActions.addProduct(product));
  }

  /**
   * Empties the cart.
   */
  public emptyCart(): void {
    this.store.dispatch(cartActions.emptyCart({}));
  }

  /**
   * Sends the order to the backend and resets the cart on success.
   */
  public sendOrder(): void {
    const order: Partial<Order> = {
      user: this.loginService.getUser(),
      date: new Date().toString(),
      products: this.products
    };

    this.ordersService
      .sendOrder(order)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.store.dispatch(cartActions.emptyCart({}));
          this.nzMessageService.success('Orden enviada correctamente.');
        },
        error: () => {
          this.nzMessageService.error('Hubo un error enviando la orden. Por favor, intenta nuevamente.');
        }
      });
  }
}
