import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LoginService } from '../login.service'; 
import { map, take } from 'rxjs/operators'; // Toegevoegd voor RxJS operaties

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router); // Toegevoegd om de gebruiker door te sturen

  // We luisteren live naar de Firebase datastroom van de LoginService
  return loginService.userIsAuthenticated$.pipe(
    take(1), // Pak één keer de huidige status en sluit de meting (veilig voor guards)
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true; // Toegang toegestaan, de router navigeert nu door!
      }

      // Als je niet bent ingelogd, sturen we de gebruiker naar de inlogpagina
      console.warn('Navigatie geblokkeerd door guard: Niet ingelogd.');
      router.navigateByUrl('/login'); // Voorkomt dat de app op een wit scherm blijft hangen
      return false;
    })
  );
};