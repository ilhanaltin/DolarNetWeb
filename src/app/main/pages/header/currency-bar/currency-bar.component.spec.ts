import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyBarComponent } from './currency-bar.component';

describe('CurrencyBarComponent', () => {
  let component: CurrencyBarComponent;
  let fixture: ComponentFixture<CurrencyBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
