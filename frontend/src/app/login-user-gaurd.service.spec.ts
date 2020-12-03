import { TestBed } from '@angular/core/testing';

import { LoginUserGaurdService } from './login-user-gaurd.service';

describe('LoginUserGaurdService', () => {
  let service: LoginUserGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUserGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
