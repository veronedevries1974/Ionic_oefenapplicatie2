import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, sendPasswordResetEmail } from '@angular/fire/auth'; // sendPasswordResetEmail toegevoegd
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // 1. Injecteer de Firebase Auth module
  private auth: Auth = inject(Auth);

  // 2. Firebase houdt hier live de ingelogde gebruiker in bij
  currentUser$ = user(this.auth);

  constructor() { }

  // 3. Je Guard kan deze getter blijven gebruiken!
  // We kijken of er een geldige gebruiker (user) actief is in Firebase
  get userIsAuthenticated$(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => user !== null) // Geeft true als er een user is, anders false
    );
  }

  // 4. Nieuw account registreren in Firebase
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // 5. Inloggen via Firebase (vervangt jouw oude handmatige login)
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 6. Uitloggen via Firebase (vervangt jouw oude handmatige logout)
  logout() {
    return signOut(this.auth);
  }

  // 7. Wachtwoord herstel-mail versturen via Firebase
  sendPasswordReset(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}

// LoginService: Bevat de directe koppeling met Firebase voor zowel login(), 
// register() als logout().Signup: Is een kleine doorgeef-service die de 
// registratiegegevens van het scherm oppakt en doorzet naar de LoginService.
