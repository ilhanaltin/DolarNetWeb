import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAnalyseComponent } from './market-analyse.component';

describe('MarketAnalyseComponent', () => {
  let component: MarketAnalyseComponent;
  let fixture: ComponentFixture<MarketAnalyseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketAnalyseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
