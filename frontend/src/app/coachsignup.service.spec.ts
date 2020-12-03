import { TestBed } from '@angular/core/testing';

import { CoachsignupService } from './coachsignup.service';

describe('CoachsignupService', () => {
  let service: CoachsignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachsignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
