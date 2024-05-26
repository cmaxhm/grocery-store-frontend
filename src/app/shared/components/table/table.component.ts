import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectQuantityOfProductsInCart } from '../../state/app.selectors';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> {
  /**
   * Data to be displayed in the table.
   */
  @Input() public data: T[];

  /**
   * Columns to be displayed in the table.
   */
  @Input() public columns: string[];

  /**
   * The item template.
   */
  @ContentChild(TemplateRef) public itemTemplate!: TemplateRef<{ $implicit: T }>;

  /**
   * The number of products in the cart.
   */
  public numberOfProductsInCart$: Observable<number>;

  constructor(private store: Store) {
    this.data = [];
    this.columns = [];
    this.numberOfProductsInCart$ = this.store.select(selectQuantityOfProductsInCart);
  }
}
