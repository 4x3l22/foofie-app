import { TestBed } from '@angular/core/testing';

import { MediospagoService } from './mediospago.service';

describe('MediospagoService', () => {
  let service: MediospagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediospagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
