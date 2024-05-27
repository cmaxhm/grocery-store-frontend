import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { env } from '../../../../environments/environment';
import { User } from '../../interfaces/user.interface';
import { LoginService } from '../../services/login.service';
import { userActions } from '../../state/app.actions';
import { selectUser } from '../../state/app.selectors';
import { RESPONSIVE_BREAKPOINTS } from '../../utilities/responsive-breakpoints.utility';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Indicates if the screen is responsive.
   */
  public isResponsive: boolean;

  /**
   * Indicates if the menu should be displayed.
   */
  public isMenuDisplayed: boolean;

  /**
   * Whether the user is authenticated or not.
   */
  public isUserAuthenticated: boolean;

  /**
   * The user data.
   */
  public user?: Partial<User>;

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
    private loginService: LoginService,
    private store: Store
  ) {
    this.isUserAuthenticated = false;
    this.isAdministratorAuthenticated = false;
    this.isResponsive = window.innerWidth <= RESPONSIVE_BREAKPOINTS.lg;
    this.isMenuDisplayed = !this.isResponsive;
    this.destroy$ = new Subject();

    this.store
      .select(selectUser)
      .pipe(
        takeUntil(this.destroy$),
        tap((user) => {
          this.user = user;
          this.isUserAuthenticated = !!(user.id);
          this.isAdministratorAuthenticated = (this.loginService.isUserAuthenticated() && user.role === env.administratorRoleName);
        })
      )
      .subscribe();
  }

  /**
   * Initializes the data.
   */
  public ngOnInit(): void {
    this.store.dispatch(userActions.setUser(this.loginService.getUser() || {}));
  }

  /**
   * Listener for Window resize and updates the isResponsive property.
   *
   * @private
   */
  @HostListener('window:resize')
  private onWindowResize(): void {
    this.isResponsive = window.innerWidth <= RESPONSIVE_BREAKPOINTS.lg;
    this.isMenuDisplayed = !this.isResponsive;
  }

  /**
   * Toggles the menu display, only if the screen is responsive.
   */
  public toggleMenu(): void {
    if (this.isResponsive) {
      this.isMenuDisplayed = !this.isMenuDisplayed;
    }
  }

  /**
   * Logs out the user.
   */
  public logout(): void {
    this.loginService.logout();
  }
}
