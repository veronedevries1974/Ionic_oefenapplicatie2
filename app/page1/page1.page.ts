import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
  standalone: false,
})
export class Page1Page implements OnInit {

  // De router, LoginService en onLogout zijn hier niet meer nodig
  constructor() { }

  ngOnInit() {
    // Hier kun je code plaatsen die start zodra de pagina opent
  }
}