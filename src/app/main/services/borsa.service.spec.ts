import { TestBed } from '@angular/core/testing';

import { GoldService } from './gold.service';

describe('GoldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoldService = TestBed.get(GoldService);
    expect(service).toBeTruthy();
  });
});
