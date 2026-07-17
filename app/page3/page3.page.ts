import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'; 
@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
  standalone: false, 
})
export class Page3Page implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    // Code die draait zodra page3 wordt geladen
  }

  // Zorgt ervoor dat de uitlogknop in de top-menubalk werkt
  onLogout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}