import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialuserComponent } from './socialuser.component';

describe('SocialuserComponent', () => {
  let component: SocialuserComponent;
  let fixture: ComponentFixture<SocialuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
