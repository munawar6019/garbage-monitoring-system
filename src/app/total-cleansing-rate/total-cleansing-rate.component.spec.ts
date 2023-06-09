import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCleansingRateComponent } from './total-cleansing-rate.component';

describe('TotalCleansingRateComponent', () => {
  let component: TotalCleansingRateComponent;
  let fixture: ComponentFixture<TotalCleansingRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCleansingRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCleansingRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
