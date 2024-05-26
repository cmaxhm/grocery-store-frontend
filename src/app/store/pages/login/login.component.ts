import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { delay, Subject, takeUntil } from 'rxjs';
import { env } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.interface';
import { LoginService } from '../../../shared/services/login.service';
import { userActions } from '../../../shared/state/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  /**
   * The login form.
   */
  public form: FormGroup;

  /**
   * Whether the login button is disabled or not.
   */
  public isLoginButtonDisabled: boolean;

  /**
   * The destroy subject. Used to avoid memory leaks.
   *
   * @private
   */
  private destroy$: Subject<void>;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private store: Store
  ) {
    this.isLoginButtonDisabled = false;
    this.destroy$ = new Subject();
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Unsubscribes from all subscriptions when the component is destroyed.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Logs in the user.
   */
  public login(): void {
    this.isLoginButtonDisabled = true;

    this.loginService
      .login()
      .pipe(
        takeUntil(this.destroy$),
        delay(1000)
      )
      .subscribe({
        next: (users: User[]) => {
          const userWithGivenCredentials = users.find((user) => user.username === this.form.value.username && user.password === this.form.value.password);

          if (!userWithGivenCredentials) {
            this.nzMessageService.error('Error al iniciar sesión. Por favor verifica tus credenciales e inténtalo de nuevo.');

            return;
          }

          const user: Partial<User> = {
            id: userWithGivenCredentials.id,
            username: userWithGivenCredentials.username,
            role: userWithGivenCredentials.role
          };

          localStorage.setItem(env.localStorageKey, JSON.stringify(user));

          this.store.dispatch(userActions.setUser(user));
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.nzMessageService.error('Error al iniciar sesión. Por favor inténtalo de nuevo.');
        },
        complete: () => {
          this.isLoginButtonDisabled = false;
        }
      });
  }
}
