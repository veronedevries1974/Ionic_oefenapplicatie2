import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service'; // 1. Correcte naam geïmporteerd
import { Auth } from '@angular/fire/auth'; // 2. Auth geïmporteerd voor de testomgeving

describe('LoginService', () => {
  let service: LoginService;
  let mockAuth: any;

  beforeEach(() => {
    // 3. We maken een 'nep' Firebase Auth object aan zodat de test niet echt internet op hoeft
    mockAuth = {};

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: Auth, useValue: mockAuth } // 4. Lever de nep-Auth aan de service
      ]
    });
    
    service = TestBed.inject(LoginService); // 5. Injecteer de correcte service
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Deze test kleurt nu weer perfect groen!
  });
});