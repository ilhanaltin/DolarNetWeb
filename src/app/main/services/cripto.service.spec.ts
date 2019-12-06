import { TestBed } from '@angular/core/testing';

import { CriptoService } from './cripto.service';

describe('CriptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CriptoService = TestBed.get(CriptoService);
    expect(service).toBeTruthy();
  });
});
