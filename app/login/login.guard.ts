import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LoginService } from '../login.service'; 

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.userIsAuthenticated) {
    return true;
  }

  // Niet ingelogd? Stuur de gebruiker veilig terug naar login
  return router.createUrlTree(['/login']);
};