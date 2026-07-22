import { Injectable, inject } from '@angular/core';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class Signup {
  private loginService = inject(LoginService);

  constructor() {}

  createNewUser(email: string, password: string) {
    return this.loginService.register(email, password);
  }
}