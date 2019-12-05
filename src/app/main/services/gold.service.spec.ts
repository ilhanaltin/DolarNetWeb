import { TestBed } from '@angular/core/testing';

import { BorsaService } from './borsa.service';

describe('BorsaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BorsaService = TestBed.get(BorsaService);
    expect(service).toBeTruthy();
  });
});
