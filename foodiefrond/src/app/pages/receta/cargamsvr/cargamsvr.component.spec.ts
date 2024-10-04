import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargamsvrComponent } from './cargamsvr.component';

describe('CargamsvrComponent', () => {
  let component: CargamsvrComponent;
  let fixture: ComponentFixture<CargamsvrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargamsvrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargamsvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
