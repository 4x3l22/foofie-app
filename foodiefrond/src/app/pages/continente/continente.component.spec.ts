import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinenteComponent } from './continente.component';

describe('ContinenteComponent', () => {
  let component: ContinenteComponent;
  let fixture: ComponentFixture<ContinenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
