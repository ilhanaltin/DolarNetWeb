import { TestBed } from '@angular/core/testing';

import { EmtiaService } from './emtia.service';

describe('EmtiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmtiaService = TestBed.get(EmtiaService);
    expect(service).toBeTruthy();
  });
});
