import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    // Hier kun je code zetten die draait zodra de pagina laadt
  }

  // Deze functie wordt aangeroepen als je op de uitlogknop klikt
  onLogout() {
    this.loginService.logout();         // 1. Zet isAuthenticated weer op false
    this.router.navigateByUrl('/login'); // 2. Stuur de gebruiker direct terug naar login
  }
}