import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetauserComponent } from './recetauser.component';

describe('RecetauserComponent', () => {
  let component: RecetauserComponent;
  let fixture: ComponentFixture<RecetauserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetauserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
