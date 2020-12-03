import { TestBed } from '@angular/core/testing';

import { CoachLoginService } from './coach-login.service';

describe('CoachLoginService', () => {
  let service: CoachLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
