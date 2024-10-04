import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaingredienteComponent } from './recetaingrediente.component';

describe('RecetaingredienteComponent', () => {
  let component: RecetaingredienteComponent;
  let fixture: ComponentFixture<RecetaingredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaingredienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaingredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
