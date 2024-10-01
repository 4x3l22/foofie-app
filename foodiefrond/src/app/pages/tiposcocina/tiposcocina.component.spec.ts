import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposcocinaComponent } from './tiposcocina.component';

describe('TiposcocinaComponent', () => {
  let component: TiposcocinaComponent;
  let fixture: ComponentFixture<TiposcocinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposcocinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposcocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
