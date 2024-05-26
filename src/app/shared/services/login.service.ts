import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { env } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { userActions } from '../state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  /**
   * Logs in the user.
   */
  public login(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${ env.apiUrl }/users`);
  }

  /**
   * Checks if the user is authenticated.
   */
  public isUserAuthenticated(): boolean {
    return !!localStorage.getItem(env.localStorageKey);
  }

  /**
   * Gets the user from the local storage.
   */
  public getUser(): User {
    return JSON.parse(localStorage.getItem(env.localStorageKey) || '{}');
  }

  /**
   * Logs out the user removing the token from the local storage and redirecting to home page.
   */
  public logout(): void {
    localStorage.removeItem(env.localStorageKey);

    this.store.dispatch(userActions.deleteUser({}));
    this.router.navigateByUrl('/');
  }
}
