import { TestBed } from '@angular/core/testing';

import { RolvistaService } from './rolvista.service';

describe('RolvistaService', () => {
  let service: RolvistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolvistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
