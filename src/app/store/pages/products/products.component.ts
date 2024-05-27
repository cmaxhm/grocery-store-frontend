import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  /**
   * The products list.
   */
  public products: Product[];

  /**
   * The input value to filter products by product name.
   */
  public filterByProductNameInputValue: string;

  /**
   * The destroy subject, used to avoid memory leaks.
   */
  private destroy$: Subject<void>;

  constructor(
    private productsService: ProductsService,
    private nzMessageService: NzMessageService
  ) {
    this.products = [];
    this.filterByProductNameInputValue = '';
    this.destroy$ = new Subject();
  }

  /**
   * Initialize data.
   */
  public ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Emit a value to the subject to unsubscribe from observables and avoid memory leak.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Track by function for ngFor.
   *
   * @param _index The index of the element.
   * @param product The product object.
   */
  public trackByFunction(_index: number, product: Product): string {
    return product.id;
  }

  /**
   * Get the products list.
   */
  public getProducts(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
        },
        error: () => {
          this.nzMessageService.error('Error obteniendo la lista de productos!');
        }
      });
  }
}
