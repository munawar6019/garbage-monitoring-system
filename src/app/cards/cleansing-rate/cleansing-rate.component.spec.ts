import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleansingRateComponent } from './cleansing-rate.component';

describe('CleansingRateComponent', () => {
  let component: CleansingRateComponent;
  let fixture: ComponentFixture<CleansingRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleansingRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleansingRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
