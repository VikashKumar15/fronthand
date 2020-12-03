import { TestBed } from '@angular/core/testing';

import { LoginCoachGaurdService } from './login-coach-gaurd.service';

describe('LoginCoachGaurdService', () => {
  let service: LoginCoachGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginCoachGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
