import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStateProfileBoxComponent } from './login-state-profile-box.component';

describe('LoginStateProfileBoxComponent', () => {
  let component: LoginStateProfileBoxComponent;
  let fixture: ComponentFixture<LoginStateProfileBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStateProfileBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStateProfileBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
