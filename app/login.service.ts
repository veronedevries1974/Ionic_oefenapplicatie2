import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  // Controleer bij het opstarten direct of de browser de inlogstatus heeft onthouden
  private isAuthenticated = localStorage.getItem('user_logged_in') === 'true';

  constructor() { }

  // De guard blijft dit op precies dezelfde manier uitlezen
  get userIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // Sla de status op als 'true' in de localStorage bij inloggen
  login() {
    this.isAuthenticated = true;
    localStorage.setItem('user_logged_in', 'true');
  }

  // Verwijder de status of zet hem op 'false' bij uitloggen
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('user_logged_in');
  }
}