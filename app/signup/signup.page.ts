import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Signup } from './signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false
})
export class SignupPage {
  isSigningUp: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private signupService: Signup, 
    private router: Router
  ) { }

  // 1. Functie asynchroon gemaakt met 'async'
  async onRegister(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Vul alle velden correct in.';
      return;
    }

    this.errorMessage = null;
    this.isSigningUp = true; 

    const email = form.value.email;
    const password = form.value.password;

    try {
      // 2. Wacht tot de Firebase registratie is voltooid
      const userCredential = await this.signupService.createNewUser(email, password);
      console.log('Gebruiker succesvol geregistreerd:', userCredential.user);
      
      // 3. Navigeer naar de homepage en reset het formulier
      await this.router.navigateByUrl('/homepage');
      form.reset();

    } catch (error: any) {
      // 4. Vang de Firebase fouten op
      console.error('Firebase Registratie Fout:', error);
      this.errorMessage = this.getFriendlyErrorMessage(error.code);

    } finally {
      // 5. Schakel de spinner altijd uit aan het einde
      this.isSigningUp = false;
    }
  }

  private getFriendlyErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Dit e-mailadres is al in gebruik door een andere gebruiker.';
      case 'auth/invalid-email':
        return 'Het ingevulde e-mailadres is niet geldig.';
      case 'auth/weak-password':
        return 'Het wachtwoord is te zwak. Kies een wachtwoord van minimaal 6 tekens.';
      default:
        return 'Er is een fout opgetreden bij de registratie. Probeer het opnieuw.';
    }
  }
}