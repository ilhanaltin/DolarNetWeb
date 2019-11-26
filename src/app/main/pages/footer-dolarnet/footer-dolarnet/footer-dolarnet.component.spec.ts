import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDolarnetComponent } from './footer-dolarnet.component';

describe('FooterDolarnetComponent', () => {
  let component: FooterDolarnetComponent;
  let fixture: ComponentFixture<FooterDolarnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterDolarnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDolarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
