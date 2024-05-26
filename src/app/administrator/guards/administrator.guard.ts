import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { env } from '../../../environments/environment';
import { LoginService } from '../../shared/services/login.service';

export const administratorGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.isUserAuthenticated() || loginService.getUser().role !== env.administratorRoleName) {
    router.navigateByUrl('/');

    return false;
  }

  return true;
};
