import { TestBed } from '@angular/core/testing';

import { CheckStringService } from './check-string.service';

describe('CheckStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckStringService = TestBed.get(CheckStringService);
    expect(service).toBeTruthy();
  });
});
