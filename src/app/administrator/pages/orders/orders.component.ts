import { Component, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { Order } from '../../../shared/interfaces/order.interface';
import { Product } from '../../../shared/interfaces/product.interface';
import { OrdersService } from '../../../shared/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnDestroy {
  /**
   * The orders list.
   */
  public orders$: Observable<Order[]>;

  /**
   * The number of orders.
   */
  public totalOrders: number;

  /**
   * The destroy subject. Used to avoid memory leaks.
   *
   * @private
   */
  private destroy$: Subject<void>;

  constructor(
    private ordersService: OrdersService,
    private nzMessageService: NzMessageService
  ) {
    this.totalOrders = 0;
    this.destroy$ = new Subject();
    this.orders$ = this.ordersService
      .getOrders()
      .pipe(
        tap((orders) => this.totalOrders = orders.length),
        catchError(() => {
          this.nzMessageService.error('Hubo un error al cargar los pedidos. Por favor, intenta nuevamente.');

          return [];
        })
      );
  }

  /**
   * Emits the destroy subject to avoid memory leaks.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Gets the total price of the products list in the order.
   *
   * @param products The products list.
   */
  public getTotal(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }
}
