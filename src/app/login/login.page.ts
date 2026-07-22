import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; 
import { LoginService } from '../login.service';
import { AlertController } from '@ionic/angular'; // AlertController geïmporteerd

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
    private router: Router,
    private alertController: AlertController // AlertController geïnjecteerd
  ) { }

  async onSubmit(form: NgForm) {
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

    try {
      await this.loginService.login(email, password);
      await this.router.navigateByUrl('/homepage');
      form.reset();

    } catch (error: any) {
      console.error('Firebase login fout:', error);
      
      if (
        error.code === 'auth/wrong-password' || 
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/invalid-credential'
      ) {
        this.errorMessage = 'Onjuist e-mailadres of wachtwoord.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'Het ingevoerde e-mailadres is niet geldig.';
      } else {
        this.errorMessage = 'Inloggen mislukt. Probeer het later opnieuw.';
      }

    } finally {
      this.isLoggingIn = false;
    }
  } 

  onSignUp() {
    console.log('Navigeer naar registratiepagina');
    this.router.navigateByUrl('/signup'); 
  }

  // Geactiveerde wachtwoordherstel met een Ionic pop-up alert
  async onForgotPassword() {
    console.log('Wachtwoord vergeten geactiveerd via alert dialoog');
    
    const alert = await this.alertController.create({
      header: 'Wachtwoord herstellen',
      message: 'Vul je e-mailadres in om een herstellink te ontvangen.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'jouw-email@domein.nl'
        }
      ],
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel'
        },
        {
          text: 'Versturen',
          handler: async (data) => {
            if (!data.email || data.email.trim() === '') {
              this.errorMessage = 'Vul een geldig e-mailadres in.';
              return;
            }
            
            try {
              this.errorMessage = null;
              // Roep de nieuwe methode uit je LoginService aan
              await this.loginService.sendPasswordReset(data.email);
              
              // Toon succesmelding aan de gebruiker
              const successAlert = await this.alertController.create({
                header: 'E-mail verzonden',
                message: 'Er is een link gestuurd naar ' + data.email + ' om je wachtwoord te herstellen. Controleer ook je spambox.',
                buttons: ['OK']
              });
              await successAlert.present();

            } catch (error: any) {
              console.error('Reset e-mail fout:', error);
              
              if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                this.errorMessage = 'Dit e-mailadres is niet bekend in ons systeem.';
              } else if (error.code === 'auth/invalid-email') {
                this.errorMessage = 'Het ingevoerde e-mailadres is niet geldig.';
              } else {
                this.errorMessage = 'Kon de herstellink niet verzenden. Probeer het later opnieuw.';
              }
            }
          }
        }
      ]
    });

    await alert.present();
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