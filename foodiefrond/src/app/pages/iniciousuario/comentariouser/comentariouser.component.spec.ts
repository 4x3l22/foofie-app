import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariouserComponent } from './comentariouser.component';

describe('ComentariouserComponent', () => {
  let component: ComentariouserComponent;
  let fixture: ComponentFixture<ComentariouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariouserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
