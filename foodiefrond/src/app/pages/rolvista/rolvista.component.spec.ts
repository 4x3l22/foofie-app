import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolvistaComponent } from './rolvista.component';

describe('RolvistaComponent', () => {
  let component: RolvistaComponent;
  let fixture: ComponentFixture<RolvistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolvistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolvistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
