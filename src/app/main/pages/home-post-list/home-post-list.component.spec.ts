import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostListComponent } from './home-post-list.component';

describe('HomePostListComponent', () => {
  let component: HomePostListComponent;
  let fixture: ComponentFixture<HomePostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
