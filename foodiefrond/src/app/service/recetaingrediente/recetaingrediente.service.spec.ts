import { TestBed } from '@angular/core/testing';

import { RecetaingredienteService } from './recetaingrediente.service';

describe('RecetaingredienteService', () => {
  let service: RecetaingredienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetaingredienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
