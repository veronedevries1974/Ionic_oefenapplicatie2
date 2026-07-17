import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'; 

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
  standalone: false,
})
export class Page2Page implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    // Hier kun je code plaatsen die start zodra de pagina opent
  }

  // Zorgt ervoor dat de uitlogknop in de menubalk werkt
  onLogout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}