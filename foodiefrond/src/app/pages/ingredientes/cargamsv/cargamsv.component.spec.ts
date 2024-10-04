import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargamsvComponent } from './cargamsv.component';

describe('CargamsvComponent', () => {
  let component: CargamsvComponent;
  let fixture: ComponentFixture<CargamsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargamsvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargamsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
