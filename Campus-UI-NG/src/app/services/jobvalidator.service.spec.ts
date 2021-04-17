import { TestBed } from '@angular/core/testing';

import { JobvalidatorService } from './jobvalidator.service';

describe('JobvalidatorService', () => {
  let service: JobvalidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobvalidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
