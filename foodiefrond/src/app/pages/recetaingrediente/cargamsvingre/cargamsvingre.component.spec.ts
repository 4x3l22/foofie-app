import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargamsvingreComponent } from './cargamsvingre.component';

describe('CargamsvingreComponent', () => {
  let component: CargamsvingreComponent;
  let fixture: ComponentFixture<CargamsvingreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargamsvingreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargamsvingreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
