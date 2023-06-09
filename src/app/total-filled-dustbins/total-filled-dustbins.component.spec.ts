import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalFilledDustbinsComponent } from './total-filled-dustbins.component';

describe('TotalFilledDustbinsComponent', () => {
  let component: TotalFilledDustbinsComponent;
  let fixture: ComponentFixture<TotalFilledDustbinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalFilledDustbinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalFilledDustbinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
