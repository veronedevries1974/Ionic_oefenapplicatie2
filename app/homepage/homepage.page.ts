import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'; // Pas het pad aan naar jouw service indien nodig

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: false,
})
export class HomepagePage implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {}

  // Methode om de gebruiker uit te loggen via Firebase
  async onLogout() {
    try {
      console.log('Gebruiker logt uit...');
      
      // 1. Wacht tot Firebase de sessie heeft beëindigd
      await this.loginService.logout();
      
      // 2. Stuur de gebruiker terug naar de welkomstpagina (of '/login')
      await this.router.navigateByUrl('/');
      
      console.log('Succesvol uitgelogd.');
    } catch (error) {
      console.error('Fout tijdens het uitloggen:', error);
    }
  }
}