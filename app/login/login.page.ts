import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; 
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  isLoggingIn: boolean = false;
  errorMessage: string | null = null; 

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log('Formulier is ongeldig. Controleer de velden.');
      this.errorMessage = 'Vul alle verplichte velden correct in.';
      return;
    }

    this.errorMessage = null;
    this.isLoggingIn = true;

    const email = form.value.email;
    const password = form.value.password;
    console.log('Inlogpoging voor:', email);

    setTimeout(() => {
      if (password === 'wachtwoord123') {
        this.loginService.login();          
        this.router.navigateByUrl('/homepage').then(() => {
          this.isLoggingIn = false;
          form.reset();
        });
      } else {
        this.isLoggingIn = false;
        this.errorMessage = 'Onjuist e-mailadres of wachtwoord. Probeer het opnieuw.';
      }
    }, 1500);
  }

  // Registratiepagina aanmaken
  onSignUp() {
    console.log('Navigeer naar registratiepagina');
    // direct te gebruiken zodra de pagina bestaat:
    // this.router.navigateByUrl('/signup');
  }

  // Forgotpagina aanmaken
  onForgotPassword() {
    console.log('Navigeer naar wachtwoord vergeten pagina of open modal');
    // direct te gebruiken zodra de pagina bestaat:
    // this.router.navigateByUrl('/forgot-password');
  }
}

//login.page.ts is het brein achter je inlogscherm. 
//Terwijl het HTML-bestand (login.page.html) bepaalt hoe de pagina eruitziet, 
//regelt dit TypeScript-bestand de logica en het gedrag van de pagina.

//De code begint met het ophalen van gereedschap uit Angular. 
//Component is nodig om de pagina te bouwen,
//NgForm is het gereedschap dat helpt om de gegevens uit je HTML-formulier 
//te begrijpen en te controleren.

//De decorator vertelt Angular dat dit bestand hoort bij de HTML-lay-out 
// (login.page.html) en de CSS-opmaak (login.page.scss). 

//Zodra een gebruiker op de "Login"-knop klikt, wordt de 
//functie onSubmit(form: NgForm) geactiveerd:
//If (form.invalid) kijkt of de gebruiker een e-mailadres heeft ingevuld. 
//Form.value.email pakt de code de tekst die de gebruiker in de ion-input heeft getypt.
//Console.log() stuurt de code het e-mailadres naar de Developer Console van je browser.

//Op dit moment print de code de gegevens alleen nog maar in je browser. 
// Als je app straks écht af is, gebruik je dit TypeScript-bestand om:
// De e-mail en het wachtwoord te controleren in een database.
// De gebruiker in te loggen (bijvoorbeeld via Firebase of een eigen API).
// De gebruiker door te sturen naar het volgende scherm (het dashboard) van je app.