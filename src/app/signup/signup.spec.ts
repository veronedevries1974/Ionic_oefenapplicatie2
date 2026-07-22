import { TestBed } from '@angular/core/testing';
import { Signup } from './signup';
import { LoginService } from './login.service';

describe('Signup', () => {
  let service: Signup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // We vertellen de testomgeving dat LoginService bestaat
      providers: [
        Signup,
        { provide: LoginService, useValue: {} } 
      ]
    });
    service = TestBed.inject(Signup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
