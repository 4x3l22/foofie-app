import { TestBed } from '@angular/core/testing';

import { ContinenteService } from './continente.service';

describe('ContinenteService', () => {
  let service: ContinenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
