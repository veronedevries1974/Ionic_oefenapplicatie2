import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { LoginService } from '../login.service'; // Importeer je service
import { Router } from '@angular/router'; // Importeer de router
import { FormsModule } from '@angular/forms'; // Nodig omdat je NgForm gebruikt
import { IonicModule } from '@ionic/angular'; // Nodig voor de ion-componenten

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockLoginService: any;
  let mockRouter: any;

  beforeEach(async () => {
    // 1. Maak 'nep' (mock) objecten aan voor de nodige functionaliteiten
    mockLoginService = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve())
    };
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true))
    };

    // 2. Configureer de testmodule met alle benodigde tools en providers
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ 
        FormsModule, 
        IonicModule.forRoot() // Zorgt dat Ionic elementen compileren in de test
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService }, // Lever de nep-service
        { provide: Router, useValue: mockRouter } // Lever de nep-router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Deze test kleurt nu weer prachtig groen!
  });
});