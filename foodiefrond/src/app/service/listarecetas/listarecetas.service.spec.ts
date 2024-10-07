import { TestBed } from '@angular/core/testing';

import { ListarecetasService } from './listarecetas.service';

describe('ListarecetasService', () => {
  let service: ListarecetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarecetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
