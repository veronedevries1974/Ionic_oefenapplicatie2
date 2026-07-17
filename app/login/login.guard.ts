import { inject } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { LoginService } from '../login.service'; // Eén map omhoog naar de app-map

export const loginGuard: CanMatchFn = (route, segments) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Als de gebruiker NIET is ingelogd, stuur hem naar de inlogpagina
  if (!loginService.userIsAuthenticated) {
    router.navigateByUrl('/login');
    return false; // Blokkeer de toegang tot de pagina
  }

  return true; // Geef toegang tot de pagina
};