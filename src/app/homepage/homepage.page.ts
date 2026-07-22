import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoginService } from '../login.service'; // Pas het pad aan indien nodig

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: false,
})
export class HomepagePage implements OnInit, OnDestroy {
  activePageTitle: string = 'Home'; // Standaard titel bovenin
  private routerSub!: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    // 1. Luister naar route-veranderingen voor de dynamische titel
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitle(event.urlAfterRedirects);
    });

    // 2. Voer de check direct uit bij het eerste laden van de pagina
    this.updateTitle(this.router.url);
  }

  // Methode om de juiste titel te bepalen op basis van de URL
  private updateTitle(url: string) {
    const urlSegments = url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];

    switch (lastSegment) {
      case 'main':
        this.activePageTitle = 'Home';
        break;
      case 'page1':
        this.activePageTitle = 'Pagina 1';
        break;
      case 'page2':
        this.activePageTitle = 'Pagina 2';
        break;
      case 'page3':
        this.activePageTitle = 'Pagina 3';
        break;
      default:
        this.activePageTitle = 'Intranet';
    }
  }

  // Methode om de gebruiker uit te loggen via Firebase
  async onLogout() {
    try {
      console.log('Gebruiker logt uit...');
      
      // Wacht tot Firebase de sessie heeft beëindigd
      await this.loginService.logout();
      
      // Stuur terug naar welcome en wis de historie (zodat ze niet 'terug' kunnen klikken)
      await this.router.navigateByUrl('/welcome', { replaceUrl: true });
      
      console.log('Succesvol uitgelogd.');
    } catch (error) {
      console.error('Fout tijdens het uitloggen:', error);
    }
  }

  ngOnDestroy() {
    // Netjes afmelden om geheugenlekken te voorkomen
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}