import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuusuarioComponent } from './menuusuario.component';

describe('MenuusuarioComponent', () => {
  let component: MenuusuarioComponent;
  let fixture: ComponentFixture<MenuusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuusuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
