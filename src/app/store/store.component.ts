import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { env } from '../../environments/environment';
import { LoginService } from '../shared/services/login.service';
import { selectQuantityOfProductsInCart, selectUser } from '../shared/state/app.selectors';

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

  /**
   * Whether an administrator is authenticated or not.
   */
  public isAdministratorAuthenticated: boolean;

  /**
   * The destroy subject. Used to avoid memory leaks.
   *
   * @private
   */
  private destroy$: Subject<void>;

  constructor(
    private store: Store,
    private loginService: LoginService
  ) {
    this.isAdministratorAuthenticated = false;
    this.productsInCart$ = this.store.select(selectQuantityOfProductsInCart);
    this.destroy$ = new Subject();

    this.store
      .select(selectUser)
      .pipe(
        takeUntil(this.destroy$),
        tap((user) => this.isAdministratorAuthenticated = (this.loginService.isUserAuthenticated() && user.role === env.administratorRoleName))
      )
      .subscribe();
  }
}
