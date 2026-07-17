import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; // Belangrijke import voor het formulier
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) { }

  // Deze functie wordt aangeroepen bij het indienen van het formulier
  onSubmit(form: NgForm) {
    // Extra controle of het formulier wel echt geldig is
    if (!form.valid) {
      return;
    }

    // Hier kun je eventueel de ingevulde waardes bekijken in je console:
    const email = form.value.email;
    const password = form.value.password;
    console.log('Inloggen met:', email, password);

    // Activeer de login-status en stuur door
    this.loginService.login();          
    this.router.navigateByUrl('/home'); 

    // Optioneel: Maak het formulier weer leeg voor de volgende keer
    form.reset();
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