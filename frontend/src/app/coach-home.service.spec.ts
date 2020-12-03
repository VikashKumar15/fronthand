import { TestBed } from '@angular/core/testing';

import { CoachHomeService } from './coach-home.service';

describe('CoachHomeService', () => {
  let service: CoachHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
